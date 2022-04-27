from lib2to3.pytree import type_repr
from rest_framework import viewsets
from accounts.models import CustomUser
from response import HTTP_200
from seller.serializer import SellerProfileSerialzer
from .models import SellerProfile
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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

# class SellerView(APIView):

#     permission_classes = (IsSellerIsAuthorized,)

#     def get(self, request):
#         user = SellerProfile.objects.get(user_id__username=request.user)
#         return HTTP_200(SellerProfileSerialzer(user).data)

#     def post(self, request):
#         SellerProfile(data = {request.data, request.user})
