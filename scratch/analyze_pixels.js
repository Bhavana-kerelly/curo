import { Jimp } from 'jimp';

async function check() {
  const image = await Jimp.read('c:/Users/bhava/OneDrive/Desktop/curo-clinic/src/assets/logo.png');
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  
  // Print corner pixels
  console.log('Top-Left (0,0):', getPixel(image, 0, 0));
  console.log('Top-Right (w-1,0):', getPixel(image, w-1, 0));
  console.log('Bottom-Left (0,h-1):', getPixel(image, 0, h-1));
  console.log('Bottom-Right (w-1,h-1):', getPixel(image, w-1, h-1));
  console.log('Center (w/2, h/2):', getPixel(image, Math.floor(w/2), Math.floor(h/2)));
}

function getPixel(image, x, y) {
  const idx = (y * image.bitmap.width + x) * 4;
  return {
    r: image.bitmap.data[idx],
    g: image.bitmap.data[idx+1],
    b: image.bitmap.data[idx+2],
    a: image.bitmap.data[idx+3],
  };
}

check();
