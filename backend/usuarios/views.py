from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from usuarios.models import Usuario
from rest_framework.views import APIView
from django.contrib.auth import authenticate, login, logout
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from usuarios.serializers import RegistraSerializer, PropriedadesUsuarioSerializer, ApagaUsuarioSerializer
from rest_framework.authtoken.models import Token



@api_view(['POST', ])
def visualizaRegistro(request):
    if request.method == 'POST':
        serializer = RegistraSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            usuario = serializer.save()
            data['response'] = "Registro bem sucedido!"
            data['email'] = usuario.email
            data['username'] = usuario.username
            token_obj, created = Token.objects.get_or_create(user=usuario)
            token = token_obj.key
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)


@api_view(['DELETE', ])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated,])
def visualizaLogout(request):
    try:
        header_autentica = request.META.get('HTTP_AUTHORIZATION')
        if not header_autentica or not header_autentica.startswith('Token '):
            return Response({'msg': 'Token inválido ou ausente.'}, status = status.HTTP_400_BAD_REQUEST)
        
        token = header_autentica.split(' ')[1]
        token_obj = Token.objects.get(key = token)

        user = token_obj.user
        if user.is_authenticated:
            request.user = user
            logout(request)
            token_obj.delete()
            return Response({'msg': 'Logout efetuado.'}, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'Usuário não autenticado.'}, status=status.HTTP_403_FORBIDDEN)
    
    except Token.DoesNotExist:
        print('Token inexistente.')
        return Response({'msg': 'Token inexistente.'}, status=status.HTTP_400_BAD_REQUEST)
    except IndexError:
        print('Formato de token inválido.')
        return Response({'msg': 'Formato de token inválido.'}, status=status.HTTP_400_BAD_REQUEST)

    

@permission_classes([IsAuthenticated,])
@api_view(['PUT',])
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



@permission_classes([IsAuthenticated])
@api_view(['POST'])
def visualizaApagaUsuario(request):
    serializer = ApagaUsuarioSerializer(data=request.data)
    data = {}

    if serializer.is_valid():
        user = request.user
        if user.check_password(serializer.validated_data['password']) and user.username == serializer.validated_data['username']:
            user.delete()
            data['response'] = "Conta foi apagada."
            return Response({'message': 'Usuario apagado.'}, status=status.HTTP_204_NO_CONTENT)
        else:
            data['response'] = "Senha ou usuario incorreto."
            return Response({'error': 'Senha ou usuario incorreto'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated,])
@authentication_classes([TokenAuthentication,])
@api_view(['GET',])
def visualizaPropriedadesUsuario(request):
    try:
        usuario = request.user
        serializer = PropriedadesUsuarioSerializer(usuario)
        return Response(serializer.data)
    except Exception as erro:
        print(f'Erro inesperado: {erro}')
        return Response({'msg' : str(erro)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    

class ObtainAuthTokenView(APIView):
    authentication_classes = []
    permission_classes = []


    def post(self, request):
        context = {}

        email = request.data.get('username')
        if email == None:
            email = request.data.get('email')
        password = request.POST.get('password')
        usuario = authenticate(email=email, password=password)

        if usuario:
            try:
                token = Token.objects.get(user=usuario)
            except Token.DoesNotExist:
                token = Token.objects.create(user=usuario)

            context['response'] = 'Autentificação bem sucedida!'
            context['pk'] = usuario.pk
            context['email'] = email
            context['token'] = token.key
            login(request, usuario)
        else:
            context['response'] = 'Error'
            context['error_message'] = 'Credenciais inválidas!'

        return Response(context)
    


    def get (self, request):
        try:
            token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
            token_obj = Token.objects.get(key=token)
            usuario = token_obj.user
            return Response({'username' : usuario.username}, status = status.HTTP_200_OK)
        
        except (Token.DoesNotExist, AttributeError):
            return Response({'username' : 'visitante'}, status=status.HTTP_404_NOT_FOUND)