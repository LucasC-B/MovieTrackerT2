from filmes.serializers import FilmeSerializer
from rest_framework import APIView
from filmes.models import Filme
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Create your views here.

class FilmeView(APIView):
    def unicoFilme(self, titulo_filme, slug):
        try:
            queryset = Filme.objects.get(pk=titulo_filme, slug=slug)
            return queryset
        except Filme.DoesNotExist:
            return None

    @swagger_auto_schema(
            operation_summary="Dados de um filme",
            operation_description="Obter todas as informações sobre o filme selecionado",
            request_body=None,
            responses={200: FilmeSerializer(), 400: 'Mensagem de erro'},
            manual_parameters=[
                openapi.Parameter('titulo_filme', openapi.IN_PATH,
                                  default=5, type=openapi.TYPE_STRING,
                                  required=True, description='Titulo do filme na URL')
            ]
    )
    def get(self, request, slug, titulo_filme):
        '''
        Retorna um filme
        Depende de:
        - APIView
        - Filme
        - FilmeSerializer
        - Response

        :param APIView self: o próprio objeto
        :param Request request: um objeto representando o pedido HTTP
        :param slug: parâmetro na URL para identificar um filme específico
        :param titulo_filme: Auxilia o slug na identifição do filme específico
        :return: dados de um filme
        :rtype: JSON
        '''
        queryset = self.unicoFilme(titulo_filme, slug)
        if queryset:
            serializer = FilmeSerializer(queryset)
            return Response(serializer.data)
        else:
            return Response({'error': f'Filme com titulo #{titulo_filme} não existe!'}, status=status.HTTP_400_BAD_REQUEST)
    

    @swagger_auto_schema(
            operation_summary='Cria filme', 
            operation_description="Criar um novo filme",
            request_body=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'titulo': openapi.Schema(default='', description='Titulo do filme', type=openapi.TYPE_STRING),
                    'nacionalidade': openapi.Schema(default='', description='Nacionalidade do filme', type=openapi.TYPE_STRING),
                    'ano': openapi.Schema(default='', description='Ano do filme', type=openapi.TYPE_INTEGER),
                    'sinopse': openapi.Schema(default='', description='Sinopse do filme', type=openapi.TYPE_STRING),
                    'diretor': openapi.Schema(default='', description='Diretor do filme', type=openapi.TYPE_STRING),
                    'nota': openapi.Schema(default='', description='Nota do filme', type=openapi.TYPE_INTEGER),
                    'review': openapi.Schema(default='', description='Review do filme', type=openapi.TYPE_STRING),
                    'visto': openapi.Schema(default='', description='Usuario viu o filme', type=openapi.TYPE_STRING),
                },
            ),
            responses={201: FilmeSerializer(), 400: 'Dados errados',},
    )
    def post(self, request):
        '''
        Cria um filme
        Depende de:
        - APIView
        - Filme
        - FilmeSerializer
        - Response

        :param APIView self: o próprio objeto
        :param Request request: um objeto representando o pedido HTTP
        :return: filme criado
        :rtype: JSON
        '''
        user = request.user

        if not user.is_authenticated:
            return Response({'error': 'Usuário não autenticado!'}, status=status.HTTP_401_UNAUTHORIZED)

        filme = Filme(titulo=serializer.validated_data['titulo'], usuario=user)
        serializer = FilmeSerializer(filme, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    @swagger_auto_schema(
            operation_summary="Atualiza filme",
            operation_description="Atualizar um filme existente",
            request_body=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'titulo': openapi.Schema(default='', description='Titulo do filme', type=openapi.TYPE_STRING),
                    'nacionalidade': openapi.Schema(default='', description='Nacionalidade do filme', type=openapi.TYPE_STRING),
                    'ano': openapi.Schema(default='', description='Ano do filme', type=openapi.TYPE_INTEGER),
                    'sinopse': openapi.Schema(default='', description='Sinopse do filme', type=openapi.TYPE_STRING),
                    'diretor': openapi.Schema(default='', description='Diretor do filme', type=openapi.TYPE_STRING),
                    'nota': openapi.Schema(default='', description='Nota do filme', type=openapi.TYPE_INTEGER),
                    'review': openapi.Schema(default='', description='Review do filme', type=openapi.TYPE_STRING),
                    'visto': openapi.Schema(default='', description='Usuario viu o filme', type=openapi.TYPE_STRING),
                },
            ),
            responses={200: FilmeSerializer(), 400: FilmeSerializer()},
            manual_parameters=[
                openapi.Parameter('titulo_filme', openapi.IN_PATH, default=41, type=openapi.TYPE_STRING,
                                  required=True, description='Titulo do filme na URL')],
    )
    def put(self, request, slug, titulo_filme):
        '''
        Atualiza filme
        Depende de:
        - APIView
        - Filme
        - FilmeSerializer
        - Response

        :param APIView self: o próprio objeto
        :param Request request: um objeto representando o pedido HTTP
        :param slug: parâmetro na URL para identificar um filme específico
        :param titulo_filme: Auxilia o slug na identifição do filme específico
        :return: dados de um filme
        :rtype: JSON
        '''
        user = request.user

        if not user.is_authenticated:
            return Response({'error': 'Usuário não autenticado!'}, status=status.HTTP_401_UNAUTHORIZED)

        filme = self.unicoFilme(titulo_filme, slug)
        serializer = FilmeSerializer(filme, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
            operation_description='Deleta filme',
            request_body=FilmeSerializer,
            responses={204: FilmeSerializer(), 400: None},
    )
    def delete(self, request, slug, titulo_filme):
        '''
        Deleta filme
        Depende de:
        - APIView
        - Filme
        - FilmeSerializer
        - Response

        :param APIView self: o próprio objeto
        :param Request request: um objeto representando o pedido HTTP
        :param slug: parâmetro na URL para identificar um filme específico
        :param titulo_filme: Auxilia o slug na identifição do filme específico
        :return: dados de um filme
        :rtype: JSON
        '''
        titulo_erro = ''
        erro = False
        for titulo in request.data:
            filme = Filme.objects.get(titulo=titulo_filme, slug=slug)
            if filme:
                filme.delete()
            else:
                titulo_erro += str(titulo)
                erro = True
        if erro:
            return Response({'error': f'Título [{titulo_erro}] não encontrado!'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
        