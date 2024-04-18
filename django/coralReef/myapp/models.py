from django.db import models
from django.conf import settings

class TrainingJob(models.Model):
    job_id = models.CharField(max_length=255, unique=True)  # Unique identifier for each job
    file_path = models.FileField(upload_to='uploaded_files/')  # Storing files in the 'uploaded_files' directory within MEDIA_ROOT
    success_status = models.CharField(max_length=50, default='pending')  # Status of the job (e.g., pending, training, completed, failed)
    timestamp = models.DateTimeField(auto_now_add=True)  # Job creation time
    training_started = models.DateTimeField(null=True, blank=True)  # Time when training started
    training_completed = models.DateTimeField(null=True, blank=True)  # Time when training completed or failed
    rendered = models.BooleanField(default=False)  # Whether the file has been rendered

    def __str__(self):
        return self.job_id
