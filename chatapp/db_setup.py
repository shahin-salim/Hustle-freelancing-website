from uuid import uuid4
from datetime import datetime
from email.policy import default
from mongoengine.fields import ListField, ReferenceField
from mongoengine import Document, StringField, IntField, DateTimeField


# 2 members in each chat. the 2 id's are saved in this document
class Members(Document):

    _id = StringField(default=str(uuid4()),)
    members = ListField(IntField(required=True))


# Chat Document containes the information about the chat details
class Chat(Document):

    members_id = ReferenceField(Members)
    _id = StringField(default=str(uuid4()),)
    sender = IntField(required=True)
    message = StringField(required=False)
    created_at = DateTimeField(required=True, default=datetime.now())
    delivery_time = IntField(required=False)
    desciption_about_offer = StringField(required=False)
    package_id = IntField(required=False)
    price = IntField(required=False)
    type = StringField(required=False)
