from db_setup import Chat
from bson import json_util, ObjectId
import json


def get_messeges(request):
    conversation_id = int(request.rel_url.query.get('conversation_id'))

    pipeline = [
        {
            "$match": {
                "conversation_id": conversation_id
            }
        },
        {
            "$sort": {
                "created_at": 1
            }
        },
        {
            "$project": {
                "created_at": 0
            }
        }
    ]

    data = Chat.objects().aggregate(pipeline)

    page_sanitized = json.loads(json_util.dumps(data))

    return page_sanitized
