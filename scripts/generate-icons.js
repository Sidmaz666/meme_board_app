const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'assets', 'images');
const sourceImage = path.join(assetsDir, 'icon-main.jpg');

// Ensure directory exists
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Check if source image exists
if (!fs.existsSync(sourceImage)) {
  console.error('❌ Source image not found:', sourceImage);
  process.exit(1);
}

// Generate icon from source image
async function generateIconFromSource(size, outputPath, options = {}) {
  const { 
    fit = 'cover', 
    position = 'center',
    background = { r: 18, g: 18, b: 18, alpha: 1 }, // Dark background
    grayscale = false,
    rounded = false
  } = options;

  let pipeline = sharp(sourceImage)
    .resize(size, size, {
      fit: fit,
      position: position,
      background: background
    });

  if (grayscale) {
    pipeline = pipeline.grayscale();
  }

  if (rounded) {
    // Create rounded corners by using a mask
    const roundedCorners = Buffer.from(
      `<svg><rect x="0" y="0" width="${size}" height="${size}" rx="${size * 0.2}" ry="${size * 0.2}"/></svg>`
    );
    pipeline = pipeline.composite([
      {
        input: roundedCorners,
        blend: 'dest-in'
      }
    ]);
  }

  await pipeline
    .png()
    .toFile(outputPath);
}

// Generate Android background (solid dark color)
async function generateAndroidBackground(size, outputPath) {
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" fill="#121212" rx="${size * 0.2}"/>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);
}

async function generateAssets() {
  console.log('🎨 Generating app icons from icon-main.jpg...\n');
  console.log('📸 Source image:', sourceImage);

  try {
    // Get source image metadata
    const metadata = await sharp(sourceImage).metadata();
    console.log(`📐 Source dimensions: ${metadata.width}x${metadata.height}\n`);

    // Generate main icon (1024x1024) - square, centered, with rounded corners
    console.log('📱 Generating icon.png (1024x1024)...');
    await generateIconFromSource(1024, path.join(assetsDir, 'icon.png'), {
      fit: 'cover',
      position: 'center',
      rounded: true
    });
    console.log('✅ icon.png created');

    // Generate Android foreground icon (1024x1024) - same as main icon
    console.log('📱 Generating android-icon-foreground.png (1024x1024)...');
    await generateIconFromSource(1024, path.join(assetsDir, 'android-icon-foreground.png'), {
      fit: 'cover',
      position: 'center',
      rounded: true
    });
    console.log('✅ android-icon-foreground.png created');

    // Generate Android background (solid dark color)
    console.log('📱 Generating android-icon-background.png (1024x1024)...');
    await generateAndroidBackground(1024, path.join(assetsDir, 'android-icon-background.png'));
    console.log('✅ android-icon-background.png created');

    // Generate Android monochrome icon (grayscale version)
    console.log('📱 Generating android-icon-monochrome.png (1024x1024)...');
    await generateIconFromSource(1024, path.join(assetsDir, 'android-icon-monochrome.png'), {
      fit: 'cover',
      position: 'center',
      grayscale: true,
      rounded: true
    });
    console.log('✅ android-icon-monochrome.png created');

    // Generate splash icon (400x400) - centered, with padding
    console.log('📱 Generating splash-icon.png (400x400)...');
    await generateIconFromSource(400, path.join(assetsDir, 'splash-icon.png'), {
      fit: 'contain',
      position: 'center',
      background: { r: 18, g: 18, b: 18, alpha: 0 } // Transparent background for splash
    });
    console.log('✅ splash-icon.png created');

    // Generate favicon (48x48)
    console.log('📱 Generating favicon.png (48x48)...');
    await generateIconFromSource(48, path.join(assetsDir, 'favicon.png'), {
      fit: 'cover',
      position: 'center',
      rounded: true
    });
    console.log('✅ favicon.png created');

    console.log('\n🎉 All assets generated successfully from icon-main.jpg!');
    console.log('\n✨ Assets ready for production use.\n');

  } catch (error) {
    console.error('❌ Error generating assets:', error);
    process.exit(1);
  }
}

generateAssets();
