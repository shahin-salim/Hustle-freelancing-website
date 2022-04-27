from category.models import Category
from django.db import models

# Create your models here.


class SubCategory(models.Model):
    name = models.CharField(max_length=100)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
