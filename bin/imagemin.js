const fs = require('fs');
const glob = require('glob');
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const webp = require('imagemin-webp'); // imagemin's WebP plugin.

(async () => {
  await Promise.all(
    glob.sync('img/*.png', { absolute: true }).map(async file => {
      const outputFile = file.replace('/img/', '/img/half/');
      if (file === outputFile) {
        throw new Error(`Problem with file: ${file}, gives outputFile: ${outputFile}`);
      }
      const input = fs.readFileSync(file);
      const { width } = await sharp(input).metadata();
      let newWidth = Math.round(width * 0.5);
      if (newWidth < 500) {
        newWidth = width;
      }
      console.log({ width, newWidth, outputFile });
      await sharp(input).resize().toFile(outputFile);
    }),
  );
  const destination = './img/min'; // Output folder

  const files = await imagemin(['img/half/*.png'], {
    destination,
    plugins: [webp({ quality: 50 })],
  });
  console.log(
    files.map(({ data, sourcePath, destinationPath }) => ({
      sourcePath,
      destinationPath,
      byteLength: data.byteLength,
    })),
  );
  const files2 = await imagemin(['img/half/*.png'], {
    destination,
    plugins: [
      imageminPngquant({
        quality: [0.5, 0.7],
      }),
    ],
  });
  console.log(
    files2.map(({ data, sourcePath, destinationPath }) => ({
      sourcePath,
      destinationPath,
      byteLength: data.byteLength,
    })),
  );
})();
