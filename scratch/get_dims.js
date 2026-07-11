import fs from 'fs';

const buffer = fs.readFileSync('c:/Users/bhava/OneDrive/Desktop/curo-clinic/src/assets/logo.png');
// PNG width is at offset 16 (4 bytes), height at offset 20 (4 bytes)
const width = buffer.readInt32BE(16);
const height = buffer.readInt32BE(20);

console.log(`Dimensions: ${width}x${height}`);
