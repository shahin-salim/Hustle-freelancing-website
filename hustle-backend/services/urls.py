
from django.urls import path
from .views import *

urlpatterns = [
    path('', ServicesView.as_view(), name="services"),
    path('scope_and_price/', ServicesView.as_view(), name="services"),

]
