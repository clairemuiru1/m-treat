from django.contrib.auth.models import AbstractUser
from django.db import models

class Patient(AbstractUser):
    phone = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # Automatically hashed by Django's User model

    # Optional: Other patient-specific fields can be added here
    address = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.username
