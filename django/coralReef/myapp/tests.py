from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import TrainingJob

class FileUploadTest(TestCase):
    def test_file_upload_and_processing(self):
        # Upload a file
        with open('myapp/test/point_cloud.ply', 'rb') as file: # Dont forget to put sample file here!!!!!!
            response = self.client.post('/upload/', {'file': SimpleUploadedFile('test.ply', file.read())})
        
        # Check initial upload response
        self.assertEqual(response.status_code, 302) 

        # Assuming there is a URL to simulate processing, e.g., '/simulate-processing/'
        response = self.client.get('/simulate-processing/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Processing simulated successfully', response.content.decode())

        # Check if the file status updated
        job = TrainingJob.objects.latest('timestamp')
        self.assertEqual(job.success_status, 'completed')
