from django.urls import path
from . import views

urlpatterns = [
    path('', views.Contacts.as_view()),
    path('contacts', views.UserContacts.as_view()),

]
