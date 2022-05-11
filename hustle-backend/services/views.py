from functools import partial
from rest_framework import viewsets
from .serializer import *
from .models import *
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from .serializer import ServicesModelSerialzer
from response import HTTP_200, HTTP_201, HTTP_400
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from utils.seller_verify import IsSellerIsAuthorized


class ServicesView(APIView):
    """
    CRUD of seller services model
    All the methods only accessed by the seller
    """

    permission_classes = (AllowAny,)

    def get(self, request):
        try:
            print(request.user)
            instance = Services.objects.filter(
                seller_id__user_id__username=request.user)
            serialzer = ServicesModelSerialzer(instance, many=True)
            return HTTP_200(serialzer.data)
        except:
            return HTTP_400({"error": "detail not found"})

    def post(self, request):
        serializer = ServicesModelSerialzer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HTTP_201(serializer.data)
        return HTTP_400(serializer.errors)

    def put(self, request):
        # try:
        pk = request.GET["pk"]
        instance = Services.objects.get(pk=pk)
        serialzer = ServicesModelSerialzer(
            instance, request.data, partial=True)

        print(serializers)
        if serialzer.is_valid():
            serialzer.save()
            return HTTP_200(serialzer.data)
        return HTTP_400(serialzer.errors)
        # except:
        #     return HTTP_400({"error": "detail not found"})

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
    permission_classes = (AllowAny,)

    def get(self, request):
        try:
            instance = ScopeAndPrice.objects.filter(
                service_id=request.GET["service_id"])
            serializer = ScopeAndPriceModelSerialzer(instance, many=True)
            return HTTP_200(serializer.data)
        except:
            return HTTP_400({"error": "detail not found"})

    def post(self, request):
        serializer = ScopeAndPriceModelSerialzer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return HTTP_201(serializer.data)
        return HTTP_400(serializer.errors)

    def put(self, request):
        try:
            instance = ScopeAndPrice.objects.get(id=request.GET["id"])
            serializer = ScopeAndPriceModelSerialzer(
                instance, request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return HTTP_200(serializer.data)
            return HTTP_400(serializer.errors)
        except:
            return HTTP_400({"error": "detail not found"})

    def delete(self, request):
        try:
            ScopeAndPrice.objects.filter(pk=request.GET["pk"]).delete()
        except:
            return HTTP_400({"error": "detail not found"})


class ListAllService(APIView):
    """
    diplsay services in the home page
    """

    permission_classes = (AllowAny,)

    def get(self, request):
        queryset = ServicesModelSerialzer(
            Services.objects.all(), many=True)

        return HTTP_200(queryset.data)


class GetService(APIView):
    """
    get specific service
    """

    permission_classes = (AllowAny,)

    def get(self, request, pk=None):
        queryset = ServicesModelSerialzer(Services.objects.get(pk=pk))
        return HTTP_200(queryset.data)
