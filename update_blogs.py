import zipfile
import xml.etree.ElementTree as ET
import json
import os

docs = ['CuroClinicBlog_'+str(i)+'.docx' for i in range(1,6)] + ['CuroClinicBlog_6 (1).docx'] + ['CuroClinicBlog_'+str(i)+'.docx' for i in range(7,21)]

def get_paragraphs(path):
    try:
        document = zipfile.ZipFile(path)
        xml_content = document.read('word/document.xml')
        document.close()
        tree = ET.XML(xml_content)
        
        paragraphs = []
        for paragraph in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
            texts = [node.text for node in paragraph.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t') if node.text]
            if texts:
                paragraphs.append(''.join(texts).strip())
        return [p for p in paragraphs if p]
    except Exception as e:
        print(f"Error reading {path}: {e}")
        return []

blogsData = []
blogsContent = {}

images = [
    '/images/consultation-room.jpg',
    '/images/dental-clinic.jpg',
    '/images/ent-care.jpg',
    '/images/gynecology-clinic.jpg',
    '/images/patient-care.jpg'
]

for idx, doc in enumerate(docs):
    path = os.path.join(os.getcwd(), doc)
    paras = get_paragraphs(path)
    if not paras:
        continue
    
    title = paras[0]
    
    summary = ""
    for p in paras[1:]:
        if len(p) > 50:
            summary = p
            break
            
    if len(summary) > 150:
        summary = summary[:147] + "..."

    blogsData.append({
        "id": str(idx + 1),
        "title": title,
        "summary": summary,
        "author": "Dr. Curo",
        "date": "Jul 24, 2026",
        "image": images[idx % len(images)],
        "category": "Healthcare",
        "docFile": doc
    })
    
    blogsContent[doc] = "\n\n".join(paras)

js_content = "export const blogsData = " + json.dumps(blogsData, indent=2) + ";\n"
with open("src/data/blogsData.js", "w", encoding="utf-8") as f:
    f.write(js_content)

with open("src/data/blogsContent.json", "w", encoding="utf-8") as f:
    json.dump(blogsContent, f, indent=2, ensure_ascii=False)

print("Finished updating blogs.")
