const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const webp = require('imagemin-webp'); // imagemin's WebP plugin.

const destination = './img/min'; // Output folder
(async () => {
  await imagemin(['img/*.png'], {
    destination,
    plugins: [
      imageminPngquant({
        quality: [0.5, 0.7],
      }),
      webp({
        lossless: true, // Losslessly encode images
      }),
    ],
  });
})();
