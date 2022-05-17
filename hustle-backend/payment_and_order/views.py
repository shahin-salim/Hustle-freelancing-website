import razorpay
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from backend.settings import RAZORPAY_API_KEY, RAZORPAY_API_SECRET
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serialzers import OrderSerializer, PaymentSerializer
from response import HTTP_200, HTTP_400, HTTP_201
from accounts.models import CustomUser
from services.models import ScopeAndPrice
from .models import Order, Payment
from utils.permission_class import Sample


razorpay_client = razorpay.Client(
    auth=(RAZORPAY_API_KEY, RAZORPAY_API_SECRET))


class Razorpay_Order(APIView):
    """
    create razopary order id for payment
    """

    permission_classes = (IsAuthenticated, Sample)

    def post(self, request):
        print("----------------------------")
        razorpay_order = razorpay_client.order.create(
            dict(
                amount=request.data["price"] * 100,
                currency="INR",
                payment_capture='0'
            ))
        # return Response(razorpay_order, status=status.HTTP_200_OK)
        return HTTP_200(razorpay_order)


class PayAndOrder(APIView):
    """
    save payment details and place the order
    """

    permission_classes = (Sample, )

    # get the order of the user
    def get(self, request, buyer_or_seller=None):
        print(buyer_or_seller)
        if not buyer_or_seller:
            return HTTP_400({"message": "detail not found"})

        if buyer_or_seller == "buyer":
            queryset = Order.objects.filter(buyer_id__username=request.user)

        elif buyer_or_seller == "seller":
            queryset = Order.objects.filter(
                package_id__service_id__seller_id__user_id__username=request.user)

        print(queryset)
        serialized_data = OrderSerializer(queryset, many=True).data
        return HTTP_200(serialized_data)

    def post(self, request):

        print(request.data)

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
