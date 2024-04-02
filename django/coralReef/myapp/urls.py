from django.urls import path
from .views import upload_file  # Import the view function
from .views import model_preview
from .views import get_most_recent_ply
urlpatterns = [
    path('upload/', upload_file, name='upload_file'),
    path('model-preview/', model_preview, name='model_preview'),
    path('get-most-recent-ply/', get_most_recent_ply, name='get_most_recent_ply'),
]
