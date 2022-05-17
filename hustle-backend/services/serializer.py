from itertools import count, groupby
from rest_framework import serializers
from .models import ScopeAndPrice, Services
from seller.serializer import SellerProfileSerialzer
from accounts.models import CustomUser
from seller.models import SellerProfile


class SellerDetailsSerialzer(serializers.ModelSerializer):

    class Meta:
        model = SellerProfile
        fields = "__all__"


class ServicesModelSerialzer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField()

    class Meta:
        model = Services
        fields = "__all__"

    def get_user(self, obj):
        try:
            price = ScopeAndPrice.objects.filter(
                service_id=obj).order_by("price")[0].price
        except:
            price = 000

        return {
            "username": obj.seller_id.user_id.username,
            "profile_image": "https://res.cloudinary.com/dkezigu54/image/upload/v1/ProductImage/Screenshot_from_2022-04-21_11-50-52_tgr83p",
            "price": price,
            "id": obj.seller_id.user_id.id
        }


class ScopeAndPriceModelSerialzer(serializers.ModelSerializer):
    """
    packages
    """
    service_id = ServicesModelSerialzer()

    class Meta:
        model = ScopeAndPrice
        fields = "__all__"
