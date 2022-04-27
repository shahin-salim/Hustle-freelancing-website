from rest_framework import status
from rest_framework.response import Response


def HTTP_200(data):
    return Response(data, status=status.HTTP_200_OK)

def HTTP_201(data):
    return Response(data, status=status.HTTP_201_CREATED)

def HTTP_400(data):
    return Response(data, status=status.HTTP_400_BAD_REQUEST)