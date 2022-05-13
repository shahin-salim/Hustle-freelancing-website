from pyexpat import model
from django.db import models
from accounts.models import CustomUser

# Create your models here.

# create conversation between two users
class Conversation(models.Model):
    user1 = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="user1")
    user2 = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="user2")
