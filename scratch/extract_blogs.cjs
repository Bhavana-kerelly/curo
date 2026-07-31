const fs = require('fs');
const mammoth = require('mammoth');
const path = require('path');

async function extractBlogs() {
  const root = 'c:\\Users\\bhava\\OneDrive\\Desktop\\curo-clinic';
  
  // Load existing blogs_content.json
  const blogsContentPath = path.join(root, 'blogs_content.json');
  let blogsContent = {};
  if (fs.existsSync(blogsContentPath)) {
    const raw = fs.readFileSync(blogsContentPath, 'utf8');
    blogsContent = JSON.parse(raw);
  }

  const newBlogs = [];

  for (let i = 6; i <= 20; i++) {
    const docName = `CuroClinicBlog_${i}.docx`;
    const docPath = path.join(root, docName);
    
    if (fs.existsSync(docPath)) {
      console.log(`Processing ${docName}...`);
      try {
        const result = await mammoth.extractRawText({ path: docPath });
        const text = result.value.trim();
        
        blogsContent[docName] = text;
        
        // Extract title (usually first line)
        const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        let title = lines[0];
        let summary = lines[1] || '';
        if (summary.length > 150) {
           summary = summary.substring(0, 147) + '...';
        }
        
        let doctor = "Unknown";
        if (title.includes("Dr.")) {
           const match = title.match(/Dr\.\s+[a-zA-Z\s]+/);
           if (match) doctor = match[0].trim();
        }

        newBlogs.push({
          id: i,
          title: title,
          summary: summary,
          date: "Jul 21, 2026",
          author: doctor,
          readTime: "5 min read",
          image: `/images/blogs/blog${i}.jpg`,
          slug: `blog-${i}`,
          category: "Health Insights",
          docFile: docName
        });
        
      } catch (e) {
        console.error(`Error processing ${docName}:`, e);
      }
    } else {
      console.log(`${docName} not found.`);
    }
  }

  fs.writeFileSync(blogsContentPath, JSON.stringify(blogsContent, null, 2));
  console.log('Updated blogs_content.json');
  
  const entriesPath = path.join(root, 'scratch', 'new_blog_entries.json');
  fs.writeFileSync(entriesPath, JSON.stringify(newBlogs, null, 2));
  console.log(`Saved entries to ${entriesPath}`);
}

extractBlogs();
