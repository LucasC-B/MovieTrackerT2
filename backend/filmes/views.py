from filmes.serializers import FilmeSerializer
from rest_framework import APIView
from filmes.models import Filme
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status

# Create your views here.

class FilmeView(APIView):
    def unicoFilme(self, titulo_filme, slug):
        try:
            queryset = Filme.objects.get(pk=titulo_filme, slug=slug)
            return queryset
        except Filme.DoesNotExist:
            return None

    def get(self, request, slug, titulo_filme):
        queryset = self.unicoFilme(titulo_filme, slug)
        if queryset:
            serializer = FilmeSerializer(queryset)
            return Response(serializer.data)
        else:
            return Response({'error': f'Filme com titulo #{titulo_filme} não existe!'}, status=status.HTTP_400_BAD_REQUEST)
        
    def post(self, request):
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
    
    def put(self, request, slug, titulo_filme):
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

    def delete(self, request, slug, titulo_filme):
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
        