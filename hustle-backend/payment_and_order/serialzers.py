from .models import CustomUser
from rest_framework import serializers
from .models import Payment, Order


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

    class Meta:
        model = Order
        fields = "__all__"
