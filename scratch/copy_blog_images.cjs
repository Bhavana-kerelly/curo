const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\Users\\bhava\\Downloads\\CURO CLINIC BLOGS';
const targetDir1 = 'c:\\Users\\bhava\\OneDrive\\Desktop\\curo-clinic\\public\\blogs';
const targetDir2 = 'c:\\Users\\bhava\\OneDrive\\Desktop\\curo-clinic\\public\\images\\blogs';

fs.mkdirSync(targetDir1, { recursive: true });
fs.mkdirSync(targetDir2, { recursive: true });

for (let i = 1; i <= 20; i++) {
  let numStr = i < 10 ? `0${i}` : `${i}`;
  let possibleNames = [`${i}.jpg`, `${numStr}.jpg`, `${i}.png`, `${numStr}.png`, `${i}.jpeg`, `${numStr}.jpeg`].filter(n => fs.existsSync(path.join(srcDir, n)));
  
  if (possibleNames.length > 0) {
    const srcFile = path.join(srcDir, possibleNames[0]);
    const ext = path.extname(possibleNames[0]);
    const destName = `blog${i}${ext}`;
    
    fs.copyFileSync(srcFile, path.join(targetDir1, destName));
    fs.copyFileSync(srcFile, path.join(targetDir2, destName));
    console.log(`Copied ${possibleNames[0]} -> ${destName}`);
  } else {
    console.log(`Warning: Could not find image for blog ${i} in ${srcDir}`);
  }
}

// Update blogsData.js to use /blogs/blogX.jpg consistently
const blogsDataPath = 'c:\\Users\\bhava\\OneDrive\\Desktop\\curo-clinic\\src\\data\\blogsData.js';
let content = fs.readFileSync(blogsDataPath, 'utf8');

// Replace /images/blogs/blogX.jpg with /blogs/blogX.jpg
content = content.replace(/\/images\/blogs\/blog(\d+)\.jpg/g, '/blogs/blog$1.jpg');

fs.writeFileSync(blogsDataPath, content, 'utf8');
console.log('Updated blogsData.js paths to /blogs/blogX.jpg');
