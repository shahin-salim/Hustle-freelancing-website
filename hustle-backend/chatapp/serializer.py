from rest_framework import serializers
from .models import Conversation
from accounts.serializer import CustomUserSerializer


from accounts.models import CustomUser


class ConversationSerialzer(serializers.ModelSerializer):
    user1 = CustomUserSerializer()
    user2 = CustomUserSerializer()

    class Meta:
        model = Conversation
        fields = "__all__"



