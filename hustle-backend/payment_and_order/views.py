import razorpay
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from backend.settings import RAZORPAY_API_KEY, RAZORPAY_API_SECRET
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serialzers import OrderSerializer, PaymentSerializer
from response import HTTP_400, HTTP_201
from accounts.models import CustomUser
from services.models import ScopeAndPrice
from .models import Order, Payment
# Create your views here.

# authorize razorpay client with API Keys.
razorpay_client = razorpay.Client(
    auth=(RAZORPAY_API_KEY, RAZORPAY_API_SECRET))


class Razorpay_Order(APIView):
    """
    create razopary order id for payment
    """

    permission_classes = (AllowAny,)

    def post(self, request):
        razorpay_order = razorpay_client.order.create(
            dict(amount=request.data["price"] * 100, currency="INR", payment_capture='0'))
        return Response(razorpay_order, status=status.HTTP_200_OK)


class PayAndOrder(APIView):
    permission_classes = (AllowAny, )

    def post(self, request):

        serialzer = PaymentSerializer(data=request.data)
        if serialzer.is_valid():
            serialzer.save()

            Order.objects.create(
                buyer_id=CustomUser.objects.get(
                    id=request.data["buyer_id"]),
                package_id=ScopeAndPrice.objects.get(
                    id=request.data["package_id"]),
                payment_id=Payment.objects.get(
                    razorpay_order_id=request.data['razorpay_order_id'])
            )

            return HTTP_201({"success": True})
        return HTTP_400(serialzer.errors)
    