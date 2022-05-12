from ast import arg
from aiohttp import web
from django.dispatch import receiver
from db_setup import Chat, Members
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
                break

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


# get contacts of the user this func provide all the
# user who have connected with the id provide user
async def _contacts(request):
    id = int(request.rel_url.query.get('id'))

    pipeline = [
        {
            "$match": {
                "members": {"$in": [id]}
            }
        },
        {
            "$unwind": "$members"
        },
        {
            "$match": {
                "members": {"$ne": id}
            }
        },
        {
            "$group": {
                "_id": "",
                "users": {
                    "$push": "$members"
                }
            }
        },
        {
            "$project": {
                "_id": 0
            }
        }
    ]

    contacts = list(Members.objects().aggregate(pipeline))[0]

    return web.json_response(
        {"contacts": contacts}
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

    members = dict(data)

    # try:
    pipeline = [
        {
            "$match": {
                "$or": [
                    {
                        "members.0": members["sender"],
                        "members.1": members["receiver"],
                    },
                    {
                        "members.0": members["sender"],
                        "members.1": members["receiver"],
                    }
                ]
            }
        }
    ]
    members_exist = list(Members.objects().aggregate(pipeline))
    print(members_exist, "\n user exist")
    chat = Chat(
        members_id = members_exist[0]["_id"],
        sender=members["sender"],
        message=members['message']
    ).save()
    print("------------------------------------", chat)

    # except:
    #     chat = Chat(
    #         sender=data['sender'],
    #         receiver=data['receiver'],
    #         delivery_time=data['delivery_time'],
    #         desciption_about_offer=data['desciption_about_offer'],
    #         package_id=data['id'],
    #         price=data['price'],
    #         type=data['type'],
    #     ).save()

    if members['receiver'] in online_users:
        await sio.emit('messages', {'message': chat.to_json()}, room=online_users[members['receiver']])

    return web.json_response(
        {"messages": chat.to_json()}
    )


async def _emit_message(to, message, id):
    await sio.emit('messages', {'message': message}, room=online_users[id])


# register two id's im Members model
async def _create_members(request):

    data = await request.json()
    print(online_users)

    pipeline = [
        {
            "$match": {
                "$or": [
                    {
                        "members.0": data['params']["members"][0],
                        "members.1": data['params']["members"][1],
                    },
                    {
                        "members.0": data['params']["members"][1],
                        "members.1": data['params']["members"][0],
                    }
                ]
            }
        }
    ]

    user_exist = list(Members.objects().aggregate(pipeline))

    if not user_exist:
        print("members not found")
        members = Members(
            members=data['params']["members"]
        ).save()

        if data['params']["members"][1] in online_users:
            _emit_message(
                to=data['params']["members"][1],
                message=data["message"]
            )

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


# create memers is for creating members using 2 id's of the user
url = cors.add(app.router.add_resource("/establish_connection"))
route = cors.add(
    url.add_route("POST", _create_members), CORS_SETUP["ROUTE_AND_OPTIONS"])

# start server
if __name__ == '__main__':
    web.run_app(app, port=4000)
