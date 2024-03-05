from django.db import models
from django.conf import settings
import os

class TrainingJob(models.Model):
    job_id = models.CharField(max_length=255, unique=True)  # Unique identifier for each job
    file_path = models.FileField(upload_to='uploaded_files/')  # Storing files in the 'uploaded_files' directory within MEDIA_ROOT
    success_status = models.CharField(max_length=50, default='pending')  # Status of the job (True if successful, False otherwise)
    timestamp = models.DateTimeField(auto_now_add=True)  # Job creation time

    def __str__(self):
        return self.job_id
