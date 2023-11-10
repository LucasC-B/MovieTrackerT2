from rest_framework import serializers
from usuarios.models import Usuario

class RegistraSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={'input_type':'passowrd'},write_only = True)

    class Meta:
        model = Usuario
        fields = ['email','username','password','password2']
        extra_kwargs = {
            'password':{'write_only':True}
        }

    def save(self):
        usuario = Usuario(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
        )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'senhas não são iguais'})
        usuario.set_password(password)
        usuario.save()

        return usuario
    
class PropriedadesUsuarioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = ['pk', 'email', 'username']

class ApagaUsuarioSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()