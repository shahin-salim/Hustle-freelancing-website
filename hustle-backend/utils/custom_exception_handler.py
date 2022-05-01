from rest_framework.views import exception_handler
from rest_framework.views import Response, status


def _does_not_exist_error():
    return Response({'error': 'detail not found'}, status=status.HTTP_400_BAD_REQUEST)


def handle(exc, context):
    handlers = {
        'DoesNotExist': _does_not_exist_error(),
    }

    response = exception_handler(exc, context)

    if response is not None:
        response.data['status_code'] = response.status_code

    exception_class = exc.__class__.__name__

    if exception_class in handlers:
        return handlers[exception_class]
    return response
