from django.http import JsonResponse, HttpResponse
from django.conf import settings
from django.shortcuts import render
import os
from .models import TrainingJob  # Ensure the TrainingJob model is imported correctly

def generate_job_id():
    # Placeholder for your job ID generation logic
    # This could be a simple counter, a UUID, or any other unique identifier strategy
    import uuid
    return uuid.uuid4().hex

def upload_file(request):
    # Check if the request is a POST and contains a file
    if request.method == 'POST' and request.FILES.get('file'):
        uploaded_file = request.FILES['file']  # Access the uploaded file
        upload_directory = os.path.join(settings.MEDIA_ROOT, 'uploaded_files')  # Set the upload directory path

        try:
            os.makedirs(upload_directory, exist_ok=True)  # Ensure the upload directory exists
            file_path = os.path.join(upload_directory, uploaded_file.name)  # Define the full file path

            # Save the uploaded file to the specified directory
            with open(file_path, 'wb+') as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)

            # Create a TrainingJob instance after the file is saved
            job = TrainingJob.objects.create(
                job_id=generate_job_id(),  # Generate a unique ID for the job
                file_path=uploaded_file.name,  # Store the filename or adjust as needed
                success_status=False  # Set initial processing status to False
            )

            # Return a JSON response indicating success and include the job ID
            return JsonResponse({'message': 'File uploaded successfully', 'job_id': job.job_id})
        except Exception as e:
            # If saving the file or creating a TrainingJob instance fails, return an error response
            return JsonResponse({'error': 'Failed to upload file', 'details': str(e)}, status=500)
    else:
        # If the request is not a POST with a file, render the upload form
        return render(request, 'upload_form.html')

