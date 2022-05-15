from django.db.models import Q
from .models import Conversation
from django.shortcuts import render
from rest_framework import viewsets
from accounts.models import CustomUser
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import ConversationSerialzer
from response import HTTP_200, HTTP_201, HTTP_400
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

# Create your views here.


class Contacts(APIView):
    """
    create and get contacts of user
    """

    permission_classes = (AllowAny,)

    def get(self, request):
        user_id = request.GET["user_id"]
        data = Conversation.objects.filter(
            Q(user1__id=user_id,) | Q(user2__id=user_id,)
        )
        return HTTP_200(ConversationSerialzer(data, many=True).data)

    def post(self, request):

        # get user instance
        users = CustomUser.objects.filter(
            id__in=[
                request.data["params"]["user1"], 
                request.data["params"]["user2"]
            ]
        )

        # find conversation which included this user
        result = Conversation.objects.filter(
            Q(user1=users[0], user2=users[1])
            |
            Q(user1=users[1], user2=users[0])
        )

        user = result[0]

        # if no coversation found new conversation will create
        if not result:
            user = Conversation.objects.create(
                user1=users[0], user2=users[1]
            )
        return HTTP_201(ConversationSerialzer(user).data)


class UserContacts(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        """
        get user contacts
        """

        data = Conversation.objects.filter(
            Q(user1__id=request.GET["id"],) | Q(user2__id=request.GET["id"],)
        )
        return HTTP_200(ConversationSerialzer(data, many=True).data)
