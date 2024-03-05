from django.shortcuts import render
from django.conf import settings
import os
from .models import TrainingJob

def generate_job_id():
    import uuid
    return uuid.uuid4().hex

def upload_file(request):
    # Initialize an empty success message
    success_message = None
    error_message = None

    if request.method == 'POST':
        # Access the uploaded files from the form
        files = request.FILES.getlist('file')

        for uploaded_file in files:
            try:
                # Define the upload directory path
                upload_directory = os.path.join(settings.MEDIA_ROOT, 'uploaded_files')
                # Ensure the upload directory exists
                os.makedirs(upload_directory, exist_ok=True)
                # Define the full file path
                file_path = os.path.join(upload_directory, uploaded_file.name)

                # Save the uploaded file to the specified directory
                with open(file_path, 'wb+') as destination:
                    for chunk in uploaded_file.chunks():
                        destination.write(chunk)

                # Generate a unique job ID for this file
                job_id = generate_job_id()
                # Create a new TrainingJob object and save it to the database
                TrainingJob.objects.create(job_id=job_id, file_path=file_path, success_status='pending')

                # Set the success message for display in the template
                success_message = "File uploaded successfully."

            except Exception as e:
                # If an error occurs, set the error message for display in the template
                error_message = f"An error occurred: {str(e)}"
                # Optionally, break out of the loop if one file fails
                break

    # Render the same upload form template with the success/error message
    return render(request, 'myapp/Upload_UI.html', {
        'success_message': success_message,
        'error_message': error_message,
    })
