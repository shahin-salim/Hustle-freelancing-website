from email.policy import default
from django.db import models
from django.forms import BooleanField, CharField
from seller.models import SellerProfile
from subcategory.models import SubCategory

# Create your models here.


class Services(models.Model):
    seller_id = models.ForeignKey(SellerProfile, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    image1 = models.ImageField(upload_to='ProductImage/')
    image2 = models.ImageField(upload_to='ProductImage/')
    discription = models.TextField()
    sub_category_id = models.ForeignKey(
        SubCategory, on_delete=models.CASCADE)
    starting_at = models.IntegerField(null=True)



class ScopeAndPrice(models.Model):
    type = models.CharField(max_length=50)
    name_of_the_package = CharField(max_length=100)
    desciption_about_offer = models.TextField()
    delivery_time = models.FloatField()
    price = models.FloatField()
    service_id = models.ForeignKey(
        Services, on_delete=models.CASCADE, related_name="service_id")
