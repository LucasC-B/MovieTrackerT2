from rest_framework import serializers
from filmes.models import Filme

class FilmeSerializer(serializers.ModelSerializer):

    usuario = serializers.SerializerMethodField('get_usuario_from_user')

    class Meta:
        model = Filme
        fields = ['titulo','nacionalidade','ano','sinopse','diretor', 'nota', 'review',
                  'visto', 'usuario', 'slug']
        
    def get_usuario_from_user(self, filme):
        usuario = filme.usuario.username
        return usuario


class FilmeCriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filme
        fields = ['titulo','nacionalidade','ano','sinopse','diretor', 'nota', 'review',
                  'visto']
    
    def create(self, validated_data):
        filme = Filme.objects.create(**validated_data)
        return filme

class FilmeAtualizaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filme
        fields = ['titulo','nacionalidade','ano','sinopse','diretor', 'nota', 'review',
                  'visto']