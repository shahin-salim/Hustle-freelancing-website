from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator
# Create your models here.


class CustomUser(AbstractUser):
    block_or_unblock = models.BooleanField(default=False)
    image = models.ImageField(upload_to='ProfilePicture/', null=True)
    is_seller = models.BooleanField(default=False)
    phone_number_regex = RegexValidator(
        regex=r'^\+?1?\d{10,10}$', message="Enter a valid phone number")
    phone_number = models.CharField(
        validators=[phone_number_regex], unique=True, max_length=10)
