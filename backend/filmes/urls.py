from django.urls import path
from filmes import views

urlpatterns = [
    path("detalha/",
         views.FilmeView.as_view(),
         name='detalha-filme'),
]
