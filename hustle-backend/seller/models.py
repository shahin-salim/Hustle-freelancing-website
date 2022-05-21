from django.db import models
from accounts.models import CustomUser
from django.contrib.postgres.fields import ArrayField
# from .signals import update_user

# Create your models here.


class SellerProfile(models.Model):
    """
    details about the seller for become an seller
    """

    description = models.TextField(default="a")
    languages = ArrayField(models.CharField(max_length=100))
    skills = ArrayField(models.CharField(max_length=100))
    user_id = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    # country = models.CharField(max_length=100)
    # occupation = models.CharField(max_length=100, null=True)
    # education = models.CharField(max_length=100, null=True)
    # website = models.CharField(max_length=100, null=True)
