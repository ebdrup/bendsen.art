function getImageEdgeColor(img) {
  // Create a canvas to analyze the image
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size to match image
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  
  // Draw the image on canvas
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
  try {
    // Sample pixels from the edges
    const edgePixels = [];
    const sampleSize = 5; // Sample every 5 pixels for performance
    
    // Top and bottom edges
    for (let x = 0; x < canvas.width; x += sampleSize) {
      // Top edge
      const topPixel = ctx.getImageData(x, 0, 1, 1).data;
      edgePixels.push([topPixel[0], topPixel[1], topPixel[2]]);
      
      // Bottom edge
      const bottomPixel = ctx.getImageData(x, canvas.height - 1, 1, 1).data;
      edgePixels.push([bottomPixel[0], bottomPixel[1], bottomPixel[2]]);
    }
    
    // Left and right edges
    for (let y = 0; y < canvas.height; y += sampleSize) {
      // Left edge
      const leftPixel = ctx.getImageData(0, y, 1, 1).data;
      edgePixels.push([leftPixel[0], leftPixel[1], leftPixel[2]]);
      
      // Right edge
      const rightPixel = ctx.getImageData(canvas.width - 1, y, 1, 1).data;
      edgePixels.push([rightPixel[0], rightPixel[1], rightPixel[2]]);
    }
    
    // Calculate average color
    let totalR = 0, totalG = 0, totalB = 0;
    for (const [r, g, b] of edgePixels) {
      totalR += r;
      totalG += g;
      totalB += b;
    }
    
    const avgR = Math.round(totalR / edgePixels.length);
    const avgG = Math.round(totalG / edgePixels.length);
    const avgB = Math.round(totalB / edgePixels.length);
    
    return `rgb(${avgR}, ${avgG}, ${avgB})`;
    
  } catch (e) {
    // Fallback if canvas access fails (CORS issues)
    return '#ccc';
  }
}

function applyEdgeColorsToImages() {
  const artContainers = document.querySelectorAll('.art > div');
  
  artContainers.forEach(container => {
    const img = container.querySelector('img');
    
    if (img) {
      // Wait for image to load
      if (img.complete && img.naturalWidth !== 0) {
        const edgeColor = getImageEdgeColor(img);
        container.style.backgroundColor = edgeColor;
      } else {
        img.addEventListener('load', () => {
          const edgeColor = getImageEdgeColor(img);
          container.style.backgroundColor = edgeColor;
        });
      }
    }
  });
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyEdgeColorsToImages);
} else {
  applyEdgeColorsToImages();
}