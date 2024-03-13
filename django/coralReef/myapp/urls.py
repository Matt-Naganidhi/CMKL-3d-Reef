from django.urls import path
from .views import upload_file  # Import the view function
from .views import model_preview

urlpatterns = [
    path('upload/', upload_file, name='upload_file'),
    path('model-preview/', model_preview, name='model_preview'),
    # Add other paths specific to this app
]
