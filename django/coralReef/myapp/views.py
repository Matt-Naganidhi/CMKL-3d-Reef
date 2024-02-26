from django.http import JsonResponse
from django.conf import settings
import os

def upload_file(request):
    """
    View function to handle file uploads.
    
    This view function receives POST requests containing file uploads.
    It extracts the uploaded file from the request and saves it to the server.
    """
    if request.method == 'POST' and request.FILES.get('file'):
        # Extract the uploaded file from the request
        uploaded_file = request.FILES['file']
        
        # Specify the directory where uploaded files will be saved
        upload_directory = os.path.join(settings.MEDIA_ROOT, 'uploaded_files')
        
        # Handle the uploaded file
        try:
            # Ensure the upload directory exists
            os.makedirs(upload_directory, exist_ok=True)
            
            # Save the file to the specified directory
            with open(os.path.join(upload_directory, uploaded_file.name), 'wb+') as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)
            
            # Return a JSON response indicating success
            return JsonResponse({'message': 'File uploaded successfully'})
        except Exception as e:
            # Return a JSON response indicating error if file upload fails
            return JsonResponse({'error': 'Failed to upload file', 'details': str(e)}, status=500)
    else:
        # Render the HTML template for the upload form
        return render(request, 'upload_form.html')
