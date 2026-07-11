import { Jimp } from 'jimp';

async function crop() {
  const image = await Jimp.read('c:/Users/bhava/OneDrive/Desktop/curo-clinic/src/assets/logo.png');
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  
  let minX = w, minY = h, maxX = -1, maxY = -1;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const a = image.bitmap.data[idx + 3];
      
      // The logo itself is fully opaque (alpha is 255)
      if (a > 200) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  console.log(`Solid bounds: X: ${minX}..${maxX}, Y: ${minY}..${maxY}`);
  console.log(`Cropped size: ${maxX - minX + 1}x${maxY - minY + 1}`);

  if (maxX > minX && maxY > minY) {
    // Crop with 10px margin on all sides to prevent cutting off edges
    const margin = 10;
    const x = Math.max(0, minX - margin);
    const y = Math.max(0, minY - margin);
    const croppedW = Math.min(w - x, (maxX - minX + 1) + margin * 2);
    const croppedH = Math.min(h - y, (maxY - minY + 1) + margin * 2);

    image.crop({ x, y, w: croppedW, h: croppedH });
    await image.write('c:/Users/bhava/OneDrive/Desktop/curo-clinic/src/assets/logo.png');
    console.log('Successfully cropped the opaque logo area!');
  }
}

crop();
