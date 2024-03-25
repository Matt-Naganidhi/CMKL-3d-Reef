# views.py

from django.http import JsonResponse
from .tasks import process_video_task

import os
import re
import shutil

def process_video_file():
    # Directory to check for .mp4 files
    uploaded_files_dir = "B:\\Pinokio\\api\\gaussian-splatting-Windows.git\\CMKL-3d-Reef-main\\django\\coralReef\\uploaded_files"
    
    # Directory to create new folders for input data
    input_data_dir = "B:\\Pinokio\\api\\gaussian-splatting-Windows.git\\input_data"
    
    # Iterate over files in the uploaded_files directory
    for filename in os.listdir(uploaded_files_dir):
        if filename.endswith(".mp4"):
            # Extract the video name without the .mp4 extension
            video_name = os.path.splitext(filename)[0]
            
            # Convert the video name to a valid folder name
            folder_name = re.sub(r'[<>:"/\\|?*]', '_', video_name)
            
            # Create the new folder path
            new_folder_path = os.path.join(input_data_dir, folder_name)
            
            # Create the new folder if it doesn't exist
            os.makedirs(new_folder_path, exist_ok=True)
            
            # Move the video file to the new folder
            video_file_path = os.path.join(uploaded_files_dir, filename)
            new_video_file_path = os.path.join(new_folder_path, filename)
            shutil.move(video_file_path, new_video_file_path)
            
            # Call the convert_video_to_photos function with the new folder path
            convert_video_to_photos(new_folder_path)

def check_for_new_tasks(request):
    if request.method == 'GET':
        # Check the database for the next task that is ready for processing
        # For the sake of this example, let's say we have a status 'ready_to_process'
        tasks = VideoProcessingJob.objects.filter(status='ready_to_process')
        for task in tasks:
            # Trigger the processing task for each video
            process_video_task.delay(task.file_id)
        return JsonResponse({'status': 'tasks submitted'}, status=200)




