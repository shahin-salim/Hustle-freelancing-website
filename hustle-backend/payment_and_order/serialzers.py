

from .models import CustomUser
from rest_framework import serializers
from .models import Payment, Order
from services.serializer import ScopeAndPriceModelSerialzer


class PaymentSerializer(serializers.ModelSerializer):
    """
    Payment model serialzer
    """

    class Meta:
        model = Payment
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    """
    Order model serialzer
    """

    payment_id = PaymentSerializer()
    buyer_and_seller = serializers.SerializerMethodField()
    package_id = ScopeAndPriceModelSerialzer()

    class Meta:
        model = Order
        fields = "__all__"

    def get_buyer_and_seller(self, obj):
        return {
            "buyer": {
                "id": obj.buyer_id.id,
                "buyer_name": obj.buyer_id.username
            },
        }
