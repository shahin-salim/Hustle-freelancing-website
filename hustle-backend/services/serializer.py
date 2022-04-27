from dataclasses import field
from rest_framework import serializers
from .models import *
from seller.serializer import SellerProfileSerialzer


class ServicesSerialzer(serializers.ModelSerializer):
    # seller_id = SellerProfileSerialzer(many=False)

    class Meta:
        model = Services
        fields = "__all__"


class ScopeAndPriceSerialzer(serializers.ModelSerializer):
    class Meta:
        model = ScopeAndPrice
        fields = "__all__"