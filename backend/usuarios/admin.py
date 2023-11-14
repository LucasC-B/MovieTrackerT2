from django.contrib import admin
from usuarios.models import Usuario
from django.contrib.auth.admin import UserAdmin
# Register your models here.

class UsarioAdmin(UserAdmin):
    list_display = ('username','email','is_admin','is_staff')
    search_fields = ('email','username')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()

admin.site.register(Usuario, UsarioAdmin)