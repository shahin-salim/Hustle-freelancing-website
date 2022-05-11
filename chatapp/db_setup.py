from datetime import datetime
from uuid import uuid4
from mongoengine import Document, StringField, IntField, DateTimeField


# Chat Document containes the information about the chat details
class Chat(Document):

    _id = StringField(default=str(uuid4()),)
    sender = IntField(required=True)
    receiver = IntField(required=True)
    message = StringField(required=False)
    created_at = DateTimeField(required=True, default=datetime.now())
    delivery_time = IntField(required=False)
    desciption_about_offer = StringField(required=False)
    package_id = IntField(required=False)
    price = IntField(required=False)
    type = StringField(required=False)


