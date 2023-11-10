from django.db import models
from django.conf import settings

# Create your models here.
class Filme(models.Model):
    titulo = models.CharField(primary_key=True, help_text='Digite o titulo do filme', 
                              max_length=50, null=False, blank=False)
    nacionalidade = models.CharField(help_text='Digite a nacionalidade do filme', 
                              max_length=50, null=False, blank=False)
    ano = models.CharField(help_text='Digite o ano de lancamento do filme', 
                              max_length=50, null=False, blank=False)
    sinopse = models.CharField(help_text='Digite a sinopse do filme', 
                              max_length=1000, null=True, blank=True)
    diretor = models.CharField(help_text='Digite o nome do diretor', 
                              max_length=50, null=False, blank=False)
    nota = models.CharField(help_text='Digite a nota que avalia o filme', 
                              max_length=50, null=True, blank=True)
    review = models.CharField(help_text='Digite um breve review do filme', 
                              max_length=1000, null=True, blank=True)
    visto = models.BooleanField(default=False)
    
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    slug = models.SlugField(blank=True, unique=True)
    
    class Meta:
        ordering = ['titulo']
        managed = True
    
    def __str__(self):
        return self.titulo