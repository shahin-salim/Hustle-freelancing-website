from django.db import models
from order.models import Order

# Create your models here.


# class AdminWallet(models.Model):
#     """
#     All the payments done in order is transfered to admin account.
#     Admin will transfer the amount after the order is completed
#     """
#     amount = models.FloatField()
#     order_id = models.ForeignKey(Order, on_delete=models.CASCADE)
#     is_transfered = models.BooleanField(default=False)