from django.urls import path
from filmes.views import (
    api_detail_filme_view,
    api_create_filme_view,
    api_update_filme_view,
    api_delete_filme_view,
    ApiFilmeListView,
)

app_name = 'filmes'

urlpatterns = [
    path('<slug>/',api_detail_filme_view, name='detail'),
    path('<slug>/update',api_update_filme_view, name='update'),
    path('<slug>/delete',api_delete_filme_view, name='delete'),
    path('create',api_create_filme_view, name='create'),
    path('list',ApiFilmeListView.as_view(), name='list'),
]
