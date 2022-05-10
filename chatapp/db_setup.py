from datetime import datetime
from uuid import uuid4
from  mongoengine import Document, StringField, IntField, DateTimeField


# Chat Document containes the information about the chat details
class Chat(Document):
    
    _id = StringField(default=str(uuid4()),)
    sender = IntField(required=True)
    receiver = IntField(required=True)
    message = StringField(required=True)
    negotiation = IntField(required=False)
    created_at = DateTimeField(required= True, default=datetime.now())


    # save data
    # def save_chat(message):
    #     return Chat(
    #         sender = message["sender"],
    #         receiver = message['receiver'], 
    #         message=message["message"]
    #     ).save()