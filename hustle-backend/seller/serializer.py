from rest_framework import serializers
from .models import *


class SellerProfileSerialzer(serializers.ModelSerializer):
    class Meta:
        model = SellerProfile
        fields="__all__"

    # def create(self, validated_data):
    #     seller_profile = SellerProfile(
    #         language=validated_data['language'],
    #         occupation=validated_data['occupation'],
    #         education=validated_data['education'],
    #         user_id=validated_data['user_id'],
    #         skills=validated_data['skills']
    #     )

    #     seller_profile.save()
    #     return seller_profile


        
