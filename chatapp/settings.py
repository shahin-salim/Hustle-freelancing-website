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
            expose_headers=("X-Custom-Server-Header",),
            allow_headers=("X-Requested-With", "Content-Type"),
            max_age=3600,
        )
    }
}

# SIMPLE_JWT = {
#     'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
#     'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
#     'ROTATE_REFRESH_TOKENS': True,
#     'BLACKLIST_AFTER_ROTATION': True,
#     'UPDATE_LAST_LOGIN': False,

#     'ALGORITHM': 'HS256',
#     'SIGNING_KEY': SECRET_KEY,
#     'VERIFYING_KEY': None,
#     'AUDIENCE': None,
#     'ISSUER': None,
#     'JWK_URL': None,
#     'LEEWAY': 0,

#     'AUTH_HEADER_TYPES': ('Bearer',),
#     'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
#     'USER_ID_FIELD': 'id',
#     'USER_ID_CLAIM': 'user_id',

#     'TOKEN_TYPE_CLAIM': 'token_type',

#     'JTI_CLAIM': 'jti',

#     'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
#     'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
#     'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
# }
