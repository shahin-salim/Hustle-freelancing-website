from django.shortcuts import render
from rest_framework.views import APIView
from response import HTTP_200, HTTP_201, HTTP_400
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .models import Conversation
from accounts.models import CustomUser
from .serializer import ConversationSerialzer
from rest_framework import viewsets
from rest_framework.response import Response

from django.db.models import Q

# Create your views here.


class Contacts(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):

        users = CustomUser.objects.filter(
            id__in=[request.data["params"]["user1"], request.data["params"]["user2"]])

        result = Conversation.objects.filter(
            Q(
                user1=users[0],
                user2=users[1]
            ) |
            Q(
                user1=users[1],
                user2=users[0]
            )
        )

        user = result[0]

        if not result:

            user = Conversation.objects.create(
                user1=users[0],
                user2=users[1]
            )

        serailzer = ConversationSerialzer(user)
        return HTTP_201(serailzer.data)

    def get(self, request):
        user_id = request.GET["user_id"]
        data = Conversation.objects.filter(
            Q(
                user1__id=user_id,
            ) |
            Q(
                user2__id=user_id,
            )
        )

        serializer = ConversationSerialzer(data, many=True)
        return HTTP_200(serializer.data)


class UserContacts(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        print("////////////////////////////////////////////////")
        print(request.GET["id"])
        data = Conversation.objects.filter(
            Q(
                user1__id=request.GET["id"],
            ) |
            Q(
                user2__id=request.GET["id"],
            )
        )

        serialzer = ConversationSerialzer(data, many=True)
        return HTTP_200(serialzer.data)
