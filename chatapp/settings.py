from datetime import timedelta
import socketio
import aiohttp_cors
from aiohttp import web
from decouple import config
from mongoengine import connect
# import mongoengine


# Creates a new Aiohttp Web Application
app = web.Application()   


# SECRET KEY
SECRET_KEY = config("SECRET_KEY")

# creates a new Async Socket IO Server
sio = socketio.AsyncServer(
    cors_allowed_origins='*',
    cors_credentials=True
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
            expose_headers="*",
            allow_headers="*",
            max_age=3600,
        )
    }
}