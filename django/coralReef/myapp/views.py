from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
import os
from .models import TrainingJob
import uuid
from datetime import datetime

def generate_job_id():
    return uuid.uuid4().hex

def upload_file(request):
    success_message = None
    error_message = None

    if request.method == 'POST' and request.FILES.get('file'):
        uploaded_file = request.FILES['file']
        save_path = os.path.join(settings.MEDIA_ROOT, 'uploaded_files', uploaded_file.name)
        try:
            with open(save_path, 'wb+') as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)
            success_message = "File uploaded successfully."
        except Exception as e:
            error_message = f"Failed to upload file. Error: {e}"

    return render(request, 'myapp/Upload_UI.html', {
        'success_message': success_message,
        'error_message': error_message,
    })

def model_preview(request):
    context = {}
    return render(request, 'myapp/view.html', context)

def get_most_recent_ply(request):
    # Construct the path to where your .ply files are stored
    models_dir = os.path.join(settings.BASE_DIR, 'static', 'models')
    try:
        ply_files = [f for f in os.listdir(models_dir) if f.endswith('.ply')]
        if not ply_files:
            raise FileNotFoundError("No .ply files found.")
        
        most_recent_file = max(ply_files, key=lambda f: os.path.getmtime(os.path.join(models_dir, f)))
        # Note: Adjust the path below if necessary for the frontend to correctly reference the file
        most_recent_file_path = os.path.join('static', 'models', most_recent_file) 
        
        response_data = {
            'success': True,
            'file_path': most_recent_file_path,
        }
    except FileNotFoundError as e:
        response_data = {
            'success': False,
            'error': str(e),
        }
    except Exception as e:
        response_data = {
            'success': False,
            'error': "An error occurred while fetching the .ply file.",
        }
    
    return JsonResponse(response_data)
