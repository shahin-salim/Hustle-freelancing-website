from rest_framework import viewsets
from .serializer import SubCategorySerialzer
from .models import SubCategory
from utils.permission_class import IsUserIsAuthorized
from rest_framework.permissions import AllowAny


class SubCategoryView(viewsets.ModelViewSet):
    permission_classes = (IsUserIsAuthorized,)
    serializer_class = SubCategorySerialzer
    queryset = SubCategory.objects.all()
