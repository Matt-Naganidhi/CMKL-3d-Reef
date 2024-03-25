from celery import shared_task
import subprocess
import os
import sys

project_path = os.path.abspath('B:\\Pinokio\\api\\gaussian-splatting-Windows.git\\CMKL-3d-Reef-main\\django\\coralReef')
sys.path.append(project_path)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coralReef.settings')

from myapp.models import TrainingJob
from .models import TrainingJob


@shared_task
def process_video_task(job_id):
    # Retrieve the training job from the database
    job = TrainingJob.objects.get(job_id=job_id)
    job.success_status = 'processing'
    job.save()

    try:
        # Extract the folder path from the file path
        folder_path = os.path.dirname(job.file_path)

        # Activate conda environment
        subprocess.run(["conda", "activate", "your_env_name"])

        # Run Gaussian Splatting command
        gaussian_splatting_cmd = [
            "python", "convert.py", "-s",
            f"\gaussian-splatting-Windows.git\\input_data\\{os.path.basename(folder_path)}"
        ]
        subprocess.run(gaussian_splatting_cmd, check=True)

        # Run Colmap command
        colmap_cmd = [
            "python", "train.py", "-s",
            f"input_data/{os.path.basename(folder_path)}"
        ]
        success = subprocess.run(colmap_cmd, check=True)

        if success.returncode == 0:
            job.success_status = 'success'
            # Logic to send the .ply file back to server
        else:
            job.success_status = 'failed'

    except Exception as e:
        job.success_status = 'failed'
        job.error_message = str(e)

    finally:
        job.save()

@shared_task
def check_for_new_jobs():
    # Check the database for new training jobs
    pending_jobs = TrainingJob.objects.filter(success_status='pending')
    for job in pending_jobs:
        # Trigger the processing task for each pending job
        process_training_job.delay(job.job_id)