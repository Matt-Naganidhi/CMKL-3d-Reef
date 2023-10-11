import tkinter as tk
from tkinter import filedialog, messagebox
import os


def browse_image_path():
    """Open a file dialog to select an image path."""
    path = filedialog.askdirectory()
    entry_image_path.delete(0, tk.END)
    entry_image_path.insert(0, path)

    # Automatically set the database, model1, and model2 names based on the folder name
    folder_name = os.path.basename(path).replace(' ', '-')
    entry_db_name.delete(0, tk.END)
    entry_db_name.insert(0, folder_name)
    entry_model1.delete(0, tk.END)
    entry_model1.insert(0, f"{folder_name}-model1")
    entry_model2.delete(0, tk.END)
    entry_model2.insert(0, f"{folder_name}-model2")

def run_colmap_operations():
    """Generate and display Colmap commands based on user input."""
    path1 = entry_image_path.get()
    # Convert any forward slashes to backslashes
    path1 = path1.replace('/', '\\')
    
    # Extract the base directory up to 'ngp\instant-ngp'
    base_dir = path1.split('ngp\\instant-ngp')[0] + 'ngp\\instant-ngp'

    database1 = entry_db_name.get()
    model1 = entry_model1.get()
    model2 = entry_model2.get()

    # Check if the path contains the directory 'ngp\instant-ngp'
    if 'ngp\\instant-ngp' not in path1:
        messagebox.showerror("Error", "Please select a directory that includes 'ngp\\instant-ngp'")
        return

    # Create database1.db, model1, and model2 directories within 'ngp\instant-ngp'
    db_path = os.path.join(base_dir, f"{database1}.db")
    model1_path = os.path.join(base_dir, model1)
    model2_path = os.path.join(base_dir, model2)

    # Create the database file and directories if they don't exist
    open(db_path, 'a').close()  # Creates an empty file if it doesn't exist
    os.makedirs(model1_path, exist_ok=True)
    os.makedirs(model2_path, exist_ok=True)

    # Generate Colmap commands
    feature_extractor_command = f"colmap feature_extractor --image_path {path1} --database_path {db_path}"
    exhaustive_matcher_command = f"colmap exhaustive_matcher --database_path {db_path}"
    mapper_command = f"colmap mapper --database_path {db_path} --image_path {path1} --output_path {model1_path}"
    bundle_adjuster_command = f"colmap bundle_adjuster --input_path {model1_path}/0 --output_path {model2_path}"
    model_converter_command = f"colmap model_converter --input_path {model2_path}/0 --output_path colmap_text --output_type TXT"
    nerf_converter_command = f"python scripts/colmap2nerf.py --colmap_matcher exhaustive --aabb_scale 16 --images {path1}"

    # Clear the text widget and insert the commands
    text_widget.delete(1.0, tk.END)
    text_widget.insert(tk.END, f"Commands:\n\n")
    text_widget.insert(tk.END, f" B: && cd ngp\instant-ngp && {feature_extractor_command} && {exhaustive_matcher_command} && {exhaustive_matcher_command} && {mapper_command} && {bundle_adjuster_command} && {model_converter_command} && {nerf_converter_command}\n\n")
    #text_widget.insert(tk.END, f"{exhaustive_matcher_command}\n\n")
    #text_widget.insert(tk.END, f"{mapper_command}\n\n")
    #text_widget.insert(tk.END, f"{bundle_adjuster_command}\n\n")
    #text_widget.insert(tk.END, f"{model_converter_command}\n\n")
    #text_widget.insert(tk.END, f"{nerf_converter_command}\n\n")

# Create a Tkinter window
root = tk.Tk()
root.title("Colmap Operations")
root.configure(bg='#FF6B6B')  # Coral background color

# Create and arrange input fields and labels with coral theme
label_opts = {'bg': '#FF6B6B', 'fg': '#FFFFFF'}  # Background and foreground options for labels
entry_opts = {'bg': '#FF9E9E', 'fg': '#000000'}  # Background and foreground options for entries

label_image_path = tk.Label(root, text="Image Path:", **label_opts)
label_db_name = tk.Label(root, text="DB Name:", **label_opts)
label_model1 = tk.Label(root, text="Model 1:", **label_opts)
label_model2 = tk.Label(root, text="Model 2:", **label_opts)

entry_image_path = tk.Entry(root, **entry_opts)
entry_db_name = tk.Entry(root, **entry_opts)
entry_model1 = tk.Entry(root, **entry_opts)
entry_model2 = tk.Entry(root, **entry_opts)

# Arrange widgets with padding for a better look
label_image_path.grid(row=0, column=0, padx=10, pady=5, sticky='w')
entry_image_path.grid(row=0, column=1, padx=10, pady=5, sticky='w')
label_db_name.grid(row=1, column=0, padx=10, pady=5, sticky='w')
entry_db_name.grid(row=1, column=1, padx=10, pady=5, sticky='w')
label_model1.grid(row=2, column=0, padx=10, pady=5, sticky='w')
entry_model1.grid(row=2, column=1, padx=10, pady=5, sticky='w')
label_model2.grid(row=3, column=0, padx=10, pady=5, sticky='w')
entry_model2.grid(row=3, column=1, padx=10, pady=5, sticky='w')

# Add a browse button for image path
browse_button = tk.Button(root, text="Browse", command=browse_image_path, bg='#FF9E9E', fg='#000000')
browse_button.grid(row=0, column=2, padx=10, pady=5)

# Create a button to execute the Colmap operations with coral theme
run_button = tk.Button(root, text="Run Colmap Operations", command=run_colmap_operations, bg='#FF9E9E', fg='#000000')
run_button.grid(row=4, column=0, columnspan=3, padx=10, pady=10)

# Create a text widget to display the generated commands with coral theme
text_widget = tk.Text(root, wrap=tk.WORD, width=50, height=15, bg='#FF9E9E', fg='#000000')
text_widget.grid(row=5, column=0, columnspan=3, padx=10, pady=10)

root.mainloop()
