from atexit import register
from django.urls import path
from . import views

urlpatterns = [
    path('razorpay', views.Razorpay_Order.as_view()),
    path('', views.PayAndOrder.as_view()),
]
