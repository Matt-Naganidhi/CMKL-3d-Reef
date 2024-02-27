from django.urls import path
from .views import upload_file  # Import the view function

urlpatterns = [
    path('upload/', upload_file, name='upload_file'),
    # Add other paths specific to this app
]
