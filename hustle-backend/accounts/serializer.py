from dataclasses import field
from email.mime import image
from .models import CustomUser
from django.forms import CharField, ImageField
from rest_framework import serializers
import django.contrib.auth.password_validation as validators
from django.contrib.auth.password_validation import validate_password


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    image = serializers.ImageField()

    class Meta:
        model = CustomUser
        fields = "__all__"


    def create(self, data):
        user = CustomUser.objects.create(
            first_name=data["first_name"],
            last_name=data['last_name'],
            email=data['email'],
            phone_number=data['phone_number'],
            username=data['username'],
            image = data['image']
        )
        user.set_password(data['password'])
        user.save()

        return user