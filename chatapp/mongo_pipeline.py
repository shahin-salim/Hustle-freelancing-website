from db_setup import Chat


def get_contacts(id):
    pipeline = [
        {
            "$match": {
                "$or": [
                    {"sender": id},
                    {"receiver": id}
                ]
            }
        },
        {
            "$group":
            {
                "_id": "$sender",
                "out":
                {
                    "$push":
                    {
                        "$cond":
                        {
                            "if":
                            {
                                "$eq": ["$sender", id]
                            },
                            "then": "$receiver",
                            "else": "$sender"
                        }
                    }
                }
            }
        },


    ]

    data = list(Chat.objects().aggregate(pipeline))

    lis = []
    for i in data:
        lis.append(i['out'])
    return lis


def get_messeges(request):
    print(request.rel_url.query)
    user1 = int(request.rel_url.query.get('user1'))
    user2 = int(request.rel_url.query.get('listenTo'))

    pipeline = [
        {
            "$match": {
                "$or": [
                    {"sender": user1, "receiver": user2},
                    {"sender": user2, "receiver": user1}
                ]
            }
        },
        {
            "$sort": {"created_at": 1}
        },
        {
            "$project": {"created_at": 0}
        }
    ]

    data = list(Chat.objects().aggregate(pipeline))
    print(type(data))
    return data
