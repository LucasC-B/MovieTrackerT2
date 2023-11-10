from django.urls import path
from usuarios.views import(
    
    visualizaRegistro,
    visualizaPropriedadesUsuario,
    visualizaAtualizaUsuario,
    ObtainAuthTokenView,
    visualizaLogout,
    apagaUsuario,

)

app_name = "usuarios"

urlpatterns = [
    path('register', visualizaRegistro, name="register"),
    path('login', ObtainAuthTokenView.as_view(), name="login"),
    path('logout', visualizaLogout, name='logout'),
    path('properties', visualizaPropriedadesUsuario, name="properties"),
    path('properties/update', visualizaAtualizaUsuario, name="update"),
    path('properties/delete-usuario/', apagaUsuario, name='usuario-delete'),
]
