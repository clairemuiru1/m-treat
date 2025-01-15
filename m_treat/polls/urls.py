from django.urls import re_path
# from django.conf.urls import url

from . import views

urlpatterns = [
    # url(r'^$', views.home, name='home'),
    re_path(r'^signup$', views.signup, name="signup"),
    re_path(r"^signup/validate$", views.signup_validate, name="signup_validate"),
    re_path(r'^login$', views.c_login, name="login"),
    re_path(r'^login/send_otp$', views.send_otp, name="send_otp"),
    re_path(r"^login/validate$", views.login_validate, name="login_validate"),
    re_path(r'^update/profile$', views.update_profile, name="update_profile"),
    re_path(r'^fetch/user$',views.fetch_user, name="fetch_user"),
    re_path(r'^logout$', views.c_logout, name="logout"),
]