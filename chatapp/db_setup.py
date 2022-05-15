from uuid import uuid4
from datetime import datetime
from email.policy import default
from mongoengine.fields import ListField, ReferenceField
from mongoengine import Document, StringField, IntField, DateTimeField





# Chat Document containes the information about the chat details
class Chat(Document):

    conversation_id = IntField(required=True)
    sender = IntField(required=True)
    message = StringField(required=False)
    created_at = DateTimeField(required=True, default=datetime.now())
    delivery_time = IntField(required=False)
    desciption_about_offer = StringField(required=False)
    package_id = IntField(required=False)
    price = IntField(required=False)
    type = StringField(required=False)
    status = StringField(required=True, default="pending")
