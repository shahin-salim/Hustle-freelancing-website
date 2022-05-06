from aiohttp import web
from db_setup import Chat
from settings import *


# save item to Chat db




# get the emitted messege from the user side
@sio.on("message")
async def message(sid, message):
    print("Socket ID: ", sid)
    print(message)

    # save items to Chat document
    chat = Chat.save_chat(message)

    await sio.emit("message", chat.to_json())  



async def index(request):
    return web.Response(
        text="Hello!",
        headers={"X-Custom-Server-Header": "",}
    )



# chat url setup
chats = cors.add(app.router.add_resource("/chats"))
route = cors.add(
    chats.add_route("GET", index), CORS_SETUP["ROUTE_AND_OPTIONS"])



# start server
if __name__ == '__main__':
    web.run_app(app, port=4000)
