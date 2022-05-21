import razorpay
from django.db import models
from django.utils import timezone
from accounts.models import CustomUser
from seller.models import SellerProfile
from services.models import ScopeAndPrice

# Create your models here.


class Payment(models.Model):
    """
    order payment details saved here
    """

    amount = models.BigIntegerField()
    razorpay_payment_id = models.CharField(max_length=230, unique=True)
    razorpay_order_id = models.CharField(max_length=230, unique=True)
    transfered_to_seller = models.BooleanField(default=False)


class Order(models.Model):
    """
    all details about the order is save in this modal
    """

    date = models.DateTimeField(default=timezone.now)

    # work completed status
    buyer_completion_status = models.BooleanField(default=False)

    buyer_id = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL, null=True)
    package_id = models.ForeignKey(
        ScopeAndPrice, on_delete=models.SET_NULL, null=True)
    payment_id = models.ForeignKey(
        Payment, on_delete=models.SET_NULL, null=True)
