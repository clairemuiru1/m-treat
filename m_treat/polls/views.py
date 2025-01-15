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
