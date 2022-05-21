"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from seller.views import SellerView
from category.views import CategoryView
from subcategory.views import SubCategoryView
from services.views import ScopeAndPriceView


# create seller
seller_router = routers.DefaultRouter()
seller_router.register(r'seller', SellerView, basename='')

# create category
category_router = routers.DefaultRouter()
category_router.register(r'', CategoryView)

# create subcategory
sub_category = routers.DefaultRouter()
sub_category.register(r'', SubCategoryView)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('seller/', include("seller.urls")),
    path('category/', include(category_router.urls)),
    path('subcategory/', include(sub_category.urls)),
    path('services/', include('services.urls')),
    path('chat/', include('chatapp.urls')),

    path('order/', include('payment_and_order.urls')),

    path('__debug__/', include('debug_toolbar.urls')),
]
