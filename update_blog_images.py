import os
import shutil
import json
import re

source_dir = os.path.join(os.getcwd(), 'CURO CLINIC BLOGS')
dest_dir = os.path.join(os.getcwd(), 'public', 'blogs')

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

# Copy all files
for file_name in os.listdir(source_dir):
    if file_name.endswith('.jpg'):
        shutil.copy2(os.path.join(source_dir, file_name), os.path.join(dest_dir, file_name))

# Update blogsData.js
data_file = os.path.join(os.getcwd(), 'src', 'data', 'blogsData.js')

with open(data_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the JSON array part
json_str = content.replace('export const blogsData = ', '').strip().rstrip(';')
blogs = json.loads(json_str)

# Map blog IDs to image filenames
files = os.listdir(source_dir)
image_map = {}
for file_name in files:
    if file_name.endswith('.jpg'):
        # Extract number from filename (e.g. '06.jpg' -> 6, '1.jpg' -> 1)
        match = re.search(r'(\d+)', file_name)
        if match:
            num = int(match.group(1))
            image_map[str(num)] = f"/blogs/{file_name}"

for blog in blogs:
    blog_id = blog['id']
    if blog_id in image_map:
        blog['image'] = image_map[blog_id]

js_content = "export const blogsData = " + json.dumps(blogs, indent=2) + ";\n"

with open(data_file, 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Images copied and blogsData.js updated successfully.")
