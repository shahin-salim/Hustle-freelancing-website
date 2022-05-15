from response import HTTP_200
from .models import SellerProfile
from rest_framework import status
from rest_framework import viewsets
from accounts.models import CustomUser
from rest_framework.views import APIView
from rest_framework.response import Response
from seller.serializer import SellerProfileSerialzer
from rest_framework.permissions import AllowAny, IsAuthenticated
from utils.permission_class import IsUserIsAuthorized
from .signals import update_user
from utils.seller_verify import IsSellerIsAuthorized
# Create your views here.


class SellerView(viewsets.ModelViewSet):
    """
    Become a seller
    """
    permission_classes = (IsSellerIsAuthorized,)
    serializer_class = SellerProfileSerialzer
    queryset = SellerProfile.objects.all()

