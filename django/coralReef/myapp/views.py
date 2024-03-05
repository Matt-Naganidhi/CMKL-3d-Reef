from django.http import JsonResponse, HttpResponse, HttpResponseNotAllowed
from django.shortcuts import render
from django.conf import settings
import os
from .models import TrainingJob

def generate_job_id():
    import uuid
    return uuid.uuid4().hex

def upload_file(request):
    if request.method == 'GET':
        # If the request is a GET, simply render the upload form.
        # This is where you display the page initially.
        return render(request, 'myapp/Upload_UI.html')
    elif request.method == 'POST':
        # Handle file uploads for POST requests
        files = request.FILES.getlist('file')  # Get a list of uploaded files
        responses = []  # To store responses for each file
        
        for uploaded_file in files:
            try:
                upload_directory = os.path.join(settings.MEDIA_ROOT, 'uploaded_files')
                os.makedirs(upload_directory, exist_ok=True)  # Ensure the directory exists
                file_path = os.path.join(upload_directory, uploaded_file.name)
                
                # Save each uploaded file
                with open(file_path, 'wb+') as destination:
                    for chunk in uploaded_file.chunks():
                        destination.write(chunk)
                
                # Optionally create a TrainingJob instance for each file
                job = TrainingJob.objects.create(
                    job_id=generate_job_id(),
                    file_path=uploaded_file.name,
                    success_status=False  # You might update this based on further processing
                )
                
                # Add a success message for this file
                responses.append({'message': 'File uploaded successfully', 'job_id': job.job_id, 'file_name': uploaded_file.name})
            except Exception as e:
                # If there's an error, add that information for this file
                responses.append({'error': 'Failed to upload file', 'details': str(e), 'file_name': uploaded_file.name})
        
        # After processing all files, return a JSON response with the outcomes
        return JsonResponse({'files': responses})
    else:
        # If the method is neither GET nor POST, return a 405 Method Not Allowed error
        return HttpResponseNotAllowed(['GET', 'POST'])
