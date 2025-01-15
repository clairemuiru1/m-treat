# Create your views here.
import json

from django.shortcuts import render
from django.contrib.auth import login, logout
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError

from .util import otp_generator, send_otp_email, validate_otp
from .models import Patient

@login_required
def home(request):
    return render(request, "home.html")

def signup(request):
    return render(request, "signup.html")

@csrf_exempt
def signup_validate(request):
    body = json.loads(request.body)
    email = body.get("email", "")
    username = body.get("username", "")
    password = body.get("password", "")
    phone_number = body.get("phone_number", "")
    address = body.get("address", "")
    date_of_birth = body.get("date_of_birth", "")

    if not email or not username or not password:
        result = {"success": False, "message": "Missing required fields (email,username, password)."}
        return JsonResponse(result)

    try:
        patient = Patient.objects.create_user(
            username=username,
            email=email,
            password=password,
            phone_number=phone_number,
            address=address,
            date_of_birth=date_of_birth,
        )
        patient.save()
    except IntegrityError:
        result = {"success": False, "message": "A user with this email or username already exists."}
        return JsonResponse(result)

    otp = otp_generator()
    otp_status = send_otp_email(email, otp)

    if not otp_status:
        result = {"success": False, "message": "Failed to send OTP to the provided email."}
        return JsonResponse(result)

    request.session["auth_otp"] = otp
    request.session["auth_email"] = email
    result = {"success": True, "message": "OTP sent to email."}
    return JsonResponse(result)

def c_login(request):
    return render(request, "login.html")

@csrf_exempt
def send_otp(request):
    body = json.loads(request.body)
    email = body.get("email", "")

    otp = otp_generator()
    otp_status = send_otp_email(email, otp)

    if not otp_status:
        result = {"success": False, "message": "Invalid email address."}
        return JsonResponse(result)

    request.session["auth_otp"] = otp
    request.session["auth_email"] = email
    result = {"success": True, "message": "OTP sent successfully."}
    return JsonResponse(result)

@csrf_exempt
def login_validate(request):
    body = json.loads(request.body)
    sent_otp = request.session.get("auth_otp", "")
    sent_email = request.session.get("auth_email", "")
    email = body.get("email", "")
    otp = body.get("otp", "")

    result = validate_otp(otp, sent_otp, email, sent_email)

    if not result["success"]:
        return JsonResponse(result)

    try:
        patient = Patient.objects.get(email=email)
    except ObjectDoesNotExist:
        result = {"success": False, "message": "Please sign up first."}
        return JsonResponse(result)

    login(request, patient)
    result = {"success": True, "message": "Login succeeded."}
    return JsonResponse(result)

@login_required
def c_logout(request):
    logout(request)
    return HttpResponseRedirect("/login")


@csrf_exempt
@login_required
def update_profile(request):
    if request.method != "PUT":
        return JsonResponse({"success": False, "message": "Invalid request method. Use PUT."})

   
    try:
        body = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"success": False, "message": "Invalid JSON data."})

   
    phone_number = body.get("phone_number", "").strip()
    address = body.get("address", "").strip()
    date_of_birth = body.get("date_of_birth", "").strip()

   
    user = request.user

    if phone_number:
        user.phone_number = phone_number
    if address:
        user.address = address
    if date_of_birth:
        try:
            from datetime import datetime
            date_of_birth = datetime.strptime(date_of_birth, "%Y-%m-%d").date()
            user.date_of_birth = date_of_birth
        except ValueError:
            return JsonResponse({"success": False, "message": "Date of birth must be in YYYY-MM-DD format."})

    try:
        user.save()
        return JsonResponse({"success": True, "message": "Profile updated successfully."})
    except Exception as e:
        return JsonResponse({"success": False, "message": f"An error occurred: {e}"})
    
@csrf_exempt
def fetch_user(request):
    if request.method != "GET":
        return JsonResponse({"success": False, "message": "Invalid request method. Use GET."})

    # Access query parameters
    email = request.GET.get("email", "").strip()
    otp = request.GET.get("otp", "").strip()

    # Check session data
    sent_otp = request.session.get("auth_otp")
    sent_email = request.session.get("auth_email")

    if not sent_otp or not sent_email:
        return JsonResponse({"success": False, "message": "Session expired. Please request a new OTP."})

    if otp != sent_otp:
        return JsonResponse({"success": False, "message": "Invalid OTP."})

    if email != sent_email:
        return JsonResponse({"success": False, "message": "Invalid email address."})

    # Fetch user details
    try:
        if not email:
            return JsonResponse({"success": False, "message": "Email is required."})

        user = Patient.objects.get(email=email)
        user_data = {
            "username": user.username,
            "email": user.email,
            "phone_number": user.phone_number,
            "address": user.address,
            "date_of_birth": user.date_of_birth.strftime("%Y-%m-%d") if user.date_of_birth else None,
        }

        result = {"success": True, "message": "User credentials fetched successfully.", "user_data": user_data}
        return JsonResponse(result)

    except Patient.DoesNotExist:
        result = {"success": False, "message": "User not found."}
        return JsonResponse(result)
