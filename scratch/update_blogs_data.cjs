const fs = require('fs');
const path = require('path');

const root = 'c:\\Users\\bhava\\OneDrive\\Desktop\\curo-clinic';
const blogsDataPath = path.join(root, 'src', 'data', 'blogsData.js');
const entriesPath = path.join(root, 'scratch', 'new_blog_entries.json');

const newEntries = JSON.parse(fs.readFileSync(entriesPath, 'utf8'));

let currentCode = fs.readFileSync(blogsDataPath, 'utf8');
// Find the last closing bracket of the array
const arrayEndIndex = currentCode.lastIndexOf('];');

if (arrayEndIndex !== -1) {
  // Construct the new string
  const entriesString = newEntries.map(entry => {
    return `  {
    id: ${entry.id},
    title: ${JSON.stringify(entry.title)},
    summary: ${JSON.stringify(entry.summary)},
    date: ${JSON.stringify(entry.date)},
    author: ${JSON.stringify(entry.author)},
    readTime: ${JSON.stringify(entry.readTime)},
    image: ${JSON.stringify(entry.image)},
    slug: ${JSON.stringify(entry.slug)},
    category: ${JSON.stringify(entry.category)},
    docFile: ${JSON.stringify(entry.docFile)}
  }`;
  }).join(',\n');
  
  const beforeArrayEnd = currentCode.substring(0, arrayEndIndex).trimEnd();
  // check if there's a trailing comma before the end
  const hasTrailingComma = beforeArrayEnd.endsWith(',');
  
  const updatedCode = beforeArrayEnd + (hasTrailingComma ? '' : ',') + '\n' + entriesString + '\n];\n';
  
  fs.writeFileSync(blogsDataPath, updatedCode);
  console.log('Successfully updated blogsData.js');
} else {
  console.log('Could not find the end of the blogsData array');
}
