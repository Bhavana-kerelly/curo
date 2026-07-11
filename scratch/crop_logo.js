import { Jimp } from 'jimp';

async function crop() {
  try {
    const image = await Jimp.read('c:/Users/bhava/OneDrive/Desktop/curo-clinic/src/assets/logo.png');
    
    // Jimp's autocrop trims transparent or white margins automatically
    image.autocrop({ tolerance: 0.05, leaveBorder: 0 });
    
    await image.write('c:/Users/bhava/OneDrive/Desktop/curo-clinic/src/assets/logo.png');
    console.log('Logo cropped and updated successfully!');
  } catch (err) {
    console.error('Error cropping logo:', err);
  }
}

crop();
