const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

(async () => {
  await imagemin(['img/*.png'], {
    destination: 'img/min',
    plugins: [
      imageminPngquant({
        quality: [0.5, 0.7],
      }),
    ],
  });
})();
