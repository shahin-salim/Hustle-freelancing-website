from ast import arg
from aiohttp import web
from django.dispatch import receiver
from db_setup import Chat
from settings import *
from jwt_token import create_token
from mongoengine.queryset.visitor import Q


from mongo_pipeline import get_contacts, get_messeges

# this list save all the users socket id and the name if they are online
online_users = {}
sid_with_username = {}


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

        print(online_users)
        print(sid_with_username)

    @sio.event
    def set_online(sid, data):
        """
        set user sid in the dictnory
        """

        online_users[data["username"]] = sid

        print(online_users)
        print("online users +++++++++++++++++++++++++++++++++++")



async def _contacts(request):
    id = int(request.rel_url.query.get('id'))
    return web.json_response(
        {"contacts": get_contacts(id)}
    )


async def _messages(request):
    print("-------------------------------")
    data = get_messeges(request)
    return web.json_response(
        {"messages": data}
    )


async def _send_messege(request):
    data = await request.json()
    print(online_users)

    chat = Chat(
        sender=data['sender'],
        receiver=data['receiver'],
        message=data['message']
    ).save()

    # await sio.emit("message", chat.to_json())
    if data['receiver'] in online_users:
        await sio.emit('messages', {'message': chat.to_json()}, room=online_users[data['receiver']])

    return web.json_response(
        {"messages": "success"}
    )

# chat url setup
url = cors.add(app.router.add_resource("/contacts"))
route = cors.add(
    url.add_route("GET", _contacts), CORS_SETUP["ROUTE_AND_OPTIONS"])


url = cors.add(app.router.add_resource("/messages"))
route = cors.add(
    url.add_route("GET", _messages), CORS_SETUP["ROUTE_AND_OPTIONS"])

url = cors.add(app.router.add_resource("/send_messages"))
route = cors.add(
    url.add_route("POST", _send_messege), CORS_SETUP["ROUTE_AND_OPTIONS"])

# start server

if __name__ == '__main__':
    web.run_app(app, port=4000)
