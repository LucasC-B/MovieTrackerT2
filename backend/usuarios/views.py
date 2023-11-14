from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from usuarios.models import Usuario
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from usuarios.serializers import RegistraSerializer, PropriedadesUsuarioSerializer, ApagaUsuarioSerializer
from rest_framework.authtoken.models import Token

@swagger_auto_schema(request_body = RegistraSerializer, method = 'post')
@api_view(['POST', ])
def visualizaRegistro(request):
    
    if request.method == 'POST':
        serializer = RegistraSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            usuario = serializer.save()
            data['response'] = "Usuário registrado com sucesso"
            data['email'] = usuario.email
            data['username'] = usuario.username
            token_obj, created = Token.objects.get_or_create(user=usuario)
            token = token_obj.key
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)

@swagger_auto_schema(
    method = 'post',
    operation_summary = "Logout", 
    operation_description = "Efetuar Logout",
    request_body = openapi.Schema(
        type = openapi.TYPE_OBJECT,
        required = ['token'],
        properties = 
        {
            'token' : openapi.Schema(type=openapi.TYPE_STRING),
        },
    ),
)
@api_view(['POST', ])
def visualizaLogout(request):
     if request.method == "POST":
          request.user.auth_token.delete()
          return Response({"Message":"Logout efetuado!"},status=status.HTTP_200_OK)
     

@api_view(['GET',])
@permission_classes((IsAuthenticated,))
def visualizaPropriedadesUsuario(request):
    try:
        usuario = request.user
    except Usuario.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = PropriedadesUsuarioSerializer(usuario)
        return Response(serializer.data)
    

@swagger_auto_schema(request_body = RegistraSerializer, method = 'put')
@api_view(['PUT',])
@permission_classes((IsAuthenticated,))
def visualizaAtualizaUsuario(request):
    try:
        usuario = request.user
    except Usuario.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        serializer = PropriedadesUsuarioSerializer(usuario, data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['response'] = "Conta atuliazada com sucesso!"
            return Response(data=data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method = 'post',
    operation_summary = "Apagar conta", 
    operation_description = "Apagar conta",
    request_body = openapi.Schema(
        type = openapi.TYPE_OBJECT,
        required = ['username','password'],
        properties = 
        {
            'username' : openapi.Schema(type=openapi.TYPE_STRING),
            'password' : openapi.Schema(type=openapi.TYPE_STRING),
        },
    ),
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apagaUsuario(request):
    serializer = ApagaUsuarioSerializer(data=request.data)
    if serializer.is_valid():
        user = request.user
        if user.check_password(serializer.validated_data['password']) and user.username == serializer.validated_data['username']:
            user.delete()
            return Response({'message': 'Usuario apagado.'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'Senha ou usuario incorreto'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ObtainAuthTokenView(APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated,]

    @swagger_auto_schema(
        operation_summary = "Login", 
        operation_description = "Efetua Login",
        request_body = openapi.Schema(
            type = openapi.TYPE_OBJECT,
            required = ['username','password'],
            properties = {
                'username' : openapi.Schema(type=openapi.TYPE_STRING),
                'password' : openapi.Schema(type=openapi.TYPE_STRING),
            },
        ),
    )
    def post(self, request):
        context = {}

        email = request.POST.get('email')
        password = request.POST.get('password')
        usuario = authenticate(email=email, password=password)

        if usuario:
            try:
                token = Token.objects.get(user=usuario)
            except Token.DoesNotExist:
                token = Token.objects.create(user=usuario)
            context['response'] = 'Autentificacao certa'
            context['pk'] = usuario.pk
            context['email'] = email
            context['token'] = token.key
        else:
            context['response'] = 'Error'
            context['error_message'] = 'Credenciais Invalidas'

        return Response(context)
     
    