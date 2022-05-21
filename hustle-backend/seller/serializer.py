from email.mime import image
from rest_framework import serializers
from .models import *


class SellerProfileSerialzer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = SellerProfile
        fields = "__all__"

    def create(self, validated_data):
        print(validated_data)

        user = CustomUser.objects.get(
            id=validated_data["user_id"].id
        )
        user.image = validated_data["image"]
        user.is_seller = True
        user.save()

        seller_profile = SellerProfile(
            user_id=user,
            skills=validated_data['skills'],
            languages=validated_data['languages'],
            description=validated_data['description'],
        )

        seller_profile.save()
        return user
