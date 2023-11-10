from django.urls import path
from usuarios import views

urlpatterns = [
    path('token_auth/', views.CustomAuthToken.as_view(), name='token-auth')
]
