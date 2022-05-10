
from django.urls import path
from .views import *

urlpatterns = [
    path('', ServicesView.as_view(), name="services"),
    path('scope_and_price/', ScopeAndPriceView.as_view(), name="scope_and_price"),
    # path('scope_and_price/', ScopeAndPriceView.as_view(), name="services"),
    path('list_service/', ListAllService.as_view(), name="listservice"),
    path('service/<int:pk>/', GetService.as_view(), name="service"),
]
