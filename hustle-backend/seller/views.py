from .models import SellerProfile
from rest_framework import viewsets
from utils.seller_verify import SellerViewPermission
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from seller.serializer import SellerProfileSerialzer
from response import HTTP_200, HTTP_400
from rest_framework import status


# Create your views here.


# class SellerView(viewsets.ModelViewSet):
#     """
#     Become a seller
#     """

#     permission_classes = (SellerViewPermission,)
#     serializer_class = SellerProfileSerialzer
#     queryset = SellerProfile.objects.all()


class SellerView(APIView):
    """
    Become a seller
    """

    permission_classes = (SellerViewPermission,)
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        print(request.data)
        serializer = SellerProfileSerialzer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return HTTP_200({"mesa": "s"})
        else:
            return HTTP_400(serializer.errors)
