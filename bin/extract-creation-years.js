const fs = require('fs');
const path = require('path');

async function extractCreationYears() {
  const imgDir = path.join(__dirname, '../img');
  const dataDir = path.join(__dirname, '../_data');
  const outputFile = path.join(dataDir, 'creationYears.json');
  
  // Ensure _data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const creationYears = {};
  
  try {
    // Get all image files in the img directory
    const files = fs.readdirSync(imgDir);
    const imageFiles = files.filter(file => 
      /\.(png|jpg|jpeg|webp|gif)$/i.test(file)
    );
    
    for (const file of imageFiles) {
      const filePath = path.join(imgDir, file);
      const stats = fs.statSync(filePath);
      
      // Use birthtime (creation time) or mtime (modification time) as fallback
      const creationTime = stats.birthtime || stats.mtime;
      const year = creationTime.getFullYear();
      
      // Remove file extension for the key to match images.json format
      const baseFileName = path.parse(file).name;
      creationYears[baseFileName] = year;
      
      console.log(`${baseFileName}: ${year}`);
    }
    
    // Write the creation years to JSON file
    fs.writeFileSync(outputFile, JSON.stringify(creationYears, null, 2));
    console.log(`\nCreation years extracted to ${outputFile}`);
    console.log(`Total images processed: ${Object.keys(creationYears).length}`);
    
  } catch (error) {
    console.error('Error extracting creation years:', error);
    process.exit(1);
  }
}

extractCreationYears();