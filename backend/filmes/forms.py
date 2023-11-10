from django import forms
from filmes.models import Filme

class CreateFilmeForm(forms.ModelForm):

    class Meta:
        model = Filme
        fields = ['titulo', 'nacionalidade', 'ano', 'sinopse', 'diretor', 
                  'nota', 'review', 'visto']
        
class UpdateFilmeFrom(forms.ModelForm):

    class Meta:
        model = Filme
        fields = ['titulo', 'review', 'nota']

        def salva(self, commit = True):
            filmeCreate = self.instance
            filmeCreate.titulo = self.cleaned_data['titulo']
            filmeCreate.nacionalidade = self.cleaned_data['nacionalidade']
            filmeCreate.ano = self.cleaned_data['ano']
            filmeCreate.sinopse = self.cleaned_data['sinopse']
            filmeCreate.diretor = self.cleaned_data['diretor']
            filmeCreate.nota = self.cleaned_data['nota']
            filmeCreate.review = self.cleaned_data['review']
            filmeCreate.visto = self.cleaned_data['visto']
            
            if commit:
                filmeCreate.save()
            
            return filmeCreate