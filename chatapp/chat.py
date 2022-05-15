import json
from settings import *
from aiohttp import web
from db_setup import Chat
from bson import json_util, ObjectId
from django.dispatch import receiver
from mongoengine.queryset.visitor import Q


from mongo_pipeline import get_messeges

# this list save all the users socket id and the name if they are online
online_users = {}


# user esatblish connection with server
@sio.event
def connect(sid, environ):
    print('connect ', sid)

    @sio.event
    def disconnect(sid):
        """
        delete the sid and username from the dictnory
        """
        for i in online_users:
            if online_users[i] == sid:
                del online_users[i]
                break

    @sio.event
    def set_online(sid, data):
        """
        set user sid in the dictnory
        """

        online_users[data["username"]] = sid
        print(online_users)

    @sio.event
    async def offer_status(sid, data):
        """
        set user sid in the dictnory
        """

        Chat.objects(id=data["id"]["$oid"]).update_one(
            status=data["status"])

        chat_as_Json = Chat.objects(id=data["id"]["$oid"])[0].to_json()

        if data["sender"] in online_users:
            await sio.emit('offer_status', {'message': chat_as_Json}, room=online_users[data["sender"]])
        if data["currUser"] in online_users:
            await sio.emit('offer_status', {'message': chat_as_Json}, room=online_users[data["currUser"]])


async def _messages(request):
    data = get_messeges(request)
    return web.json_response(
        {"messages": data}
    )


# send message to users
async def _send_messege(request):
    data = await request.json()
    params = dict(data)

    try:
        # common chat
        chat = Chat(
            conversation_id=params["conversation_id"],
            sender=params["sender"],
            message=params['message']
        ).save()
    except:
        # seller make negotiation 
        chat = Chat(
            conversation_id=params["conversation_id"],
            sender=params['sender'],
            delivery_time=params['delivery_time'],
            message=params['discription'],
            package_id=params['id'],
            price=params['price'],
            type=params['type'],
        ).save()

    # if receive is online send message to socket id
    if params['receiver'] in online_users:
        await sio.emit('messages', {'message': chat.to_json()}, room=online_users[params['receiver']])

    return web.json_response(
        {"messages": chat.to_json()}
    )


url = cors.add(app.router.add_resource("/messages"))
route = cors.add(
    url.add_route("GET", _messages), CORS_SETUP["ROUTE_AND_OPTIONS"])


url = cors.add(app.router.add_resource("/send_messages"))
route = cors.add(
    url.add_route("POST", _send_messege), CORS_SETUP["ROUTE_AND_OPTIONS"])


# start server
if __name__ == '__main__':
    web.run_app(app, port=4000)
