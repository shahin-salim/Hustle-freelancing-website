from rest_framework import serializers
from .models import *


class CategorySerialzer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields="__all__"


