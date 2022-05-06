import socketio
import aiohttp_cors
from aiohttp import web
from decouple import config
from mongoengine import connect
# import mongoengine


# Creates a new Aiohttp Web Application
app = web.Application()   



# creates a new Async Socket IO Server
sio = socketio.AsyncServer(
    cors_allowed_origins='*',
    cors_credentials=False
)



# Binds our Socket.IO server to our Web App
sio.attach(app) 

cors = aiohttp_cors.setup(app)


# mongo database config
MONGO_CLIENT = config('MONGO_CLIENT')



# connect to mogo db database
connect(host=MONGO_CLIENT)



# cors setup
CORS_SETUP = {
    "ROUTE_AND_OPTIONS": {
        "http://localhost:3000": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers=("X-Custom-Server-Header",),
            allow_headers=("X-Requested-With", "Content-Type"),
            max_age=3600,
        )
    }
}
