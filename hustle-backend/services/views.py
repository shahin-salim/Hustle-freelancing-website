from functools import partial
from rest_framework import viewsets
from .serializer import *
from .models import *
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
# from rest_framework.response import Response
# from rest_framework import status
from .serializer import ServicesSerialzer
from response import HTTP_200, HTTP_201, HTTP_400
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from utils.seller_verify import IsSellerIsAuthorized




class ServicesView(APIView):

    """
    CRUD of seller services model
    All the methods only accessed by the seller
    """

    permission_classes = (IsSellerIsAuthorized,)

    def get(self, request):
        try:
            instance = Services.objects.filter(
                seller_id__user_id__username=request.user)
            serialzer = ServicesSerialzer(instance, many=True)
            return HTTP_200(serialzer.data)
        except:
            return HTTP_400({"error": "detail not found"})


    def post(self, request):
        serializer = ServicesSerialzer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HTTP_201(serializer.data)
        return HTTP_400(serializer.errors)



    def put(self, request):
        try:
            pk = request.GET["pk"]
            instance = Services.objects.get(pk=pk)
            serialzer = ServicesSerialzer(instance, request.data, partial=True)
            if serialzer.is_valid():
                serialzer.save()
                return HTTP_200(serialzer.data)
            return HTTP_400(serialzer.errors)
        except:
            return HTTP_400({"error": "detail not found"})



    def delete(self, request):
        try:
            Services.objects.filter(pk=request.GET["pk"]).delete()
        except:
            return HTTP_400({"error": "detail not found"})






class ScopeAndPriceView(APIView):

    """
    CRUD of seller services  scope and price
    All the methods only accessed by the seller
    """

    permission_classes = (IsSellerIsAuthorized,)

    def get(self, request):
        try:
            instance = ScopeAndPrice.objects.filter(
                service_id=request.GET["service_id"])
            serialzer = ScopeAndPriceSerialzer(instance, many=True)
            return HTTP_200(serialzer.data)
        except:
            return HTTP_400({"error": "detail not found"})



    def post(self, request):
        serializer = ScopeAndPriceSerialzer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HTTP_201(serializer.data)
        return HTTP_400(serializer.errors)



    def put(self, request):
        try:
            instance = ScopeAndPrice.objects.get(id=request.GET["id"])
            serialzer = ScopeAndPriceSerialzer(instance, request.data, partial=True)
            if serialzer.is_valid():
                serialzer.save()
                return HTTP_200(serialzer.data)
            return HTTP_400(serialzer.errors)
        except:
            return HTTP_400({"error": "detail not found"})

            

    def delete(self, request):
        try:
            ScopeAndPrice.objects.filter(pk=request.GET["pk"]).delete()
        except:
            return HTTP_400({"error": "detail not found"})
