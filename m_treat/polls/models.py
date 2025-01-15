from django.contrib.auth.models import AbstractUser
from django.db import models

class Patient(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    password = models.CharField(max_length=128) 
    email = models.EmailField(unique=True)



    groups = models.ManyToManyField(
        'auth.Group',
        related_name='patient_groups',
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='patient_user_permissions',
        blank=True,
    )

    def __str__(self):
        return self.username
    
    class Meta:
        verbose_name = "Patient"
        verbose_name_plural = "Patients"
