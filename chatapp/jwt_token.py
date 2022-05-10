import jwt
from settings import SECRET_KEY

def create_token(user_id):
    return {
        "chat_token": jwt.encode(
            {"user_id": user_id},
            SECRET_KEY,algorithm="HS256")
        }