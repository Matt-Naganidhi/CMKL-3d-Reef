from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
import os
from .models import TrainingJob
import uuid
from datetime import datetime
import subprocess

def generate_job_id():
    # Generates a unique identifier using UUID
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

            # Create a new TrainingJob instance when a file is uploaded
            job = TrainingJob.objects.create(
                job_id=generate_job_id(),
                file_path=uploaded_file.name,
                success_status='pending'
            )
            success_message = "File uploaded successfully. Job ID: {}".format(job.job_id)
        except Exception as e:
            error_message = f"Failed to upload file. Error: {e}"

    return render(request, 'myapp/Upload_UI.html', {
        'success_message': success_message,
        'error_message': error_message,
    })

def start_training(request, job_id):
    # Marks the start of training and updates the job status
    try:
        job = TrainingJob.objects.get(job_id=job_id)
        job.training_started = datetime.now()
        job.success_status = 'training'
        job.save()
        return JsonResponse({'status': 'Training started'})
    except TrainingJob.DoesNotExist:
        return JsonResponse({'error': 'Job not found'}, status=404)

def finish_training(request, job_id, status):
    # Marks the completion of training and updates the job status
    try:
        job = TrainingJob.objects.get(job_id=job_id)
        job.training_completed = datetime.now()
        job.success_status = status  # 'completed' or 'failed'
        job.save()
        return JsonResponse({'status': 'Training completed', 'outcome': status})
    except TrainingJob.DoesNotExist:
        return JsonResponse({'error': 'Job not found'}, status=404)

def model_preview(request):
    # Render the model preview page
    context = {}
    return render(request, 'myapp/view.html', context)

def get_most_recent_ply(request):
    # Finds the most recent .ply file and returns its path
    models_dir = os.path.join(settings.BASE_DIR, 'static', 'models')
    try:
        ply_files = [f for f in os.listdir(models_dir) if f.endswith('.ply')]
        if not ply_files:
            raise FileNotFoundError("No .ply files found.")
        
        most_recent_file = max(ply_files, key=lambda f: os.path.getmtime(os.path.join(models_dir, f)))
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

def activate_env_and_run_command(request, job_id):
    upload_file()
    training_job = TrainingJob.objects.get(job_id=job_id)
    print(training_job)
    
    # Set the name of the Anaconda environment you want to activate
    env_name = "gaussian-splatting"
    video_name = training_job
    
    # Set the drive and directory you want to change to
    target_drive = "B:"
    target_directory = r"B:\\Pinokio\\api\\gaussian-splatting-Windows.git"
    django_directory = training_job.file_path
    input_directory = r"B:\\Pinokio\\api\\gaussian-splatting-Windows.git\\input_data"
    folder_name = {video_name}.split('.')[0]
    
    # Set the command you want to execute
    activate_conda_command = f"conda activate gaussian-splatting"
    ffmpeg_command = f'ffmpeg -i {django_directory}\\{video_name} -vf "fps=20" {input_directory}\\{folder_name}\\input\\output%04d.png'
    colmap_command = f"python convert.py -s {input_directory}\\{folder_name}"
    gaussian_splatting_command = f"conda run -n {env_name} python train.py -s {input_directory}\\{folder_name}"
    
    try:
        # Change the drive
        change_drive_cmd = f"{target_drive}"
        os.system(change_drive_cmd)
        
        # Change the directory
        change_dir_cmd = f"cd {target_directory}"
        os.chdir(target_directory)
        print(f"{ffmpeg_command} && {colmap_command} && {gaussian_splatting_command}")
        # Execute the commands
        os.system(activate_conda_command)
        print(activate_conda_command)
        os.system(f"{ffmpeg_command} && {colmap_command}")
        start_training()
        os.system(gaussian_splatting_command)
        finish_training()
        get_most_recent_ply()
        
    except Exception as e:
        # Handle any exceptions that occurred during the process
        error_message = str(e)
        print("An error occurred: " + error_message)
    return render('B:\Pinokio\api\gaussian-splatting-Windows.git\output\11cda6ee-5\point_cloud\iteration_30000')