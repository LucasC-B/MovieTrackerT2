from django.urls import path
from accounts import views

urlpatterns = [
    path('token_auth/', views.CustomAuthToken.as_view(), name='token-auth')
]
