from atexit import register
from django.urls import path
from . import views

urlpatterns = [
    path('', views.SellerView.as_view()),
]
