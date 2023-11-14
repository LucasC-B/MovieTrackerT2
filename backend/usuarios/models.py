from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

class AdminMinhaConta(BaseUserManager):

    def create_user(self, email, username, password = None):
        if not email:
            raise ValueError("Usuario precisa ter um endereço de email")
        if not username:
            raise ValueError("Usuario precisa ter um nome")

        user = self.model(
                email = self.normalize_email(email),
                username = username,

        )

        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self,email,username, password):

        user = self.create_user(
                email = self.normalize_email(email),
                password = password,
                username = username,
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

class Usuario(AbstractBaseUser):

    id = models.AutoField(primary_key=True, null=False, blank=False)

    username = models.CharField(help_text='Entre o nome', 
                            max_length=100, null=False, blank=False)
    
    idade = models.IntegerField(help_text='Entre a idade', null=True, blank=True)

    
    email = models.EmailField(help_text='Informe o email',
                              max_length=254, null=False, blank=False, unique=True)
    
    is_admin = models.BooleanField(default=False)
    
    is_active = models.BooleanField(default=True)
    
    is_staff = models.BooleanField(default=False)
    
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['username',]

    objects = AdminMinhaConta()
    
    def __str__(self):
        return self.username
    
    def has_perm(self, perm, obj = None):
        return self.is_admin
    
    def has_module_perms(self,app_label):
        return True
    
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)