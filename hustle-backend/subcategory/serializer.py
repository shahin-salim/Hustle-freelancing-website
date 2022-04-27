from ast import Sub
from rest_framework import serializers
from .models import *


class SubCategorySerialzer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields="__all__"

    def create(self, validated_data):
        sub_category = SubCategory.objects.create(
            name = validated_data["name"],
            category_id = validated_data["category_id"]
        )

        return sub_category
