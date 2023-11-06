from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
# Autenticação
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth import login
# Swagger
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
# Create your views here.

class CustomAuthToken(ObtainAuthToken):
    @swagger_auto_schema(
        operation_summary = 'obtem o token de autenticacao'
        operation_description = 'retorna o token em caso de sucesso ou 401'
        request_body = openapi.Schema(
            type = openapi.TYPE_OBJECT,
            properties = {
                'username': openapi.Schema(),
                'password': openapi.Schema(),
            },
            required = ['username', 'password', ],
        ),
        responses = {
            status.HTTP_200_OK: 'Token is returned.',
            status.HTTP_401_UNAUTHORIZED: 'Unauthorized request.',
        },
    )
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                token, _ = Token.objects.get_or_create(user=user)
                login(request, user)
                return Response({'token': token.key})
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    
    
    @swagger_auto_schema(
        operation_summary = 'Obtem username do usuario',
        operation_description = "Retorna o username ou visitante caso nao esteja logado"
        security = [{'Token':[]}],
        manual_parameters = [
            openapi.Parameter(
                'Authorization',
                openapi.IN_HEADER,
                type = openapi.TYPE_STRING,
                description = 'Token de autenticacao no formato "token \<<i>valor do token<\i>\>"',
                default = 'token',
            )
        ]
        responses={
            200: openapi.Response(
                description = 'Nome do usuario',
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={'username' : openapi.Schema(type=openapi.TYPE_STRING)},
                ),
            )
        }
    )

    def get(self, request):
        '''
        Parâmetros: token de acesso
        Retorna: username ou 'visitante'
        '''

        try:
            token = request.META.get('HTTP_AUTHORIZATION').split(' ')[1]
            token_obj = Token.objects.get(key=token)
            user = token_obj.user
            return Response(
                {'username': user.username},
                status = status.HTTP_200_OK)
        except (Token.DoesNotExist, AttributeError):
            return Response(
                {'username': 'visitante'},
                status = status.HTTP_404_NOT_FOUND)
        