import { Jimp } from 'jimp';

async function check() {
  const image = await Jimp.read('c:/Users/bhava/OneDrive/Desktop/curo-clinic/src/assets/logo.png');
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  
  let minX = w, minY = h, maxX = -1, maxY = -1;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = image.bitmap.data[idx];
      const g = image.bitmap.data[idx + 1];
      const b = image.bitmap.data[idx + 2];
      const a = image.bitmap.data[idx + 3];
      
      // If pixel is not fully transparent and not fully white
      const isTransparent = a < 10;
      const isWhite = r > 245 && g > 245 && b > 245 && a > 240;
      
      if (!isTransparent && !isWhite) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  
  console.log(`Bounding Box: X: ${minX}..${maxX}, Y: ${minY}..${maxY}`);
  console.log(`Content Dimensions: ${maxX - minX + 1}x${maxY - minY + 1}`);

  if (maxX > minX && maxY > minY) {
    // Crop the image manually
    const croppedW = maxX - minX + 1;
    const croppedH = maxY - minY + 1;
    image.crop({ x: minX, y: minY, w: croppedW, h: croppedH });
    await image.write('c:/Users/bhava/OneDrive/Desktop/curo-clinic/src/assets/logo.png');
    console.log('Manually cropped and saved successfully!');
  }
}

check();
