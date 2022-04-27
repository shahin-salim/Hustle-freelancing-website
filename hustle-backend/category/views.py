from rest_framework import viewsets
from .models import Category
from .serializer import CategorySerialzer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.views import APIView


# Create your views here.


class CategoryView(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = CategorySerialzer
    queryset = Category.objects.all()