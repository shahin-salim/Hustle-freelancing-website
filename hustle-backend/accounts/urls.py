
from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.get_routes, name="get_urls"),
    path('users/', views.UserView.as_view(), name='users'),
    path('signup/', views.SignUp.as_view(), name='signup'),
    path('logout/', views.LogoutView.as_view(), name='token_refresh'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]