from django.db import models
from django.utils import timezone
from accounts.models import CustomUser
from seller.models import SellerProfile
from services.models import ScopeAndPrice

# Create your models here.


# class Order(models.Model):
#     buyer_id = models.ForeignKey(CustomUser, on_delete=models.SET_NULL)
#     seller_id = models.ForeignKey(SellerProfile, on_delete=models.SET_NULL)
#     package = models.ForeignKey(ScopeAndPrice, on_delete=models.SET_NULL)
#     date = models.DateTimeField(default=timezone.now)

#     # work completed status
#     seller_status = models.BooleanField(default=False)
#     buyer_ostatus = models.BooleanField(default=False)

# class Payment(models.Model):
#     amount = models.FloatField()
#     order_id = models.ForeignKey(Order, on_delete=models.CASCADE)