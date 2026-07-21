import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('src/assets/icons/hours-nutrition');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function processSheet(sheetFile, iconSpecs) {
  const sheetPath = path.resolve('src/assets/images/' + sheetFile);
  const image = sharp(sheetPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const width = info.width;
  const height = info.height;

  for (const spec of iconSpecs) {
    const { name, bounds } = spec;
    const [minX, minY, maxX, maxY] = bounds;

    const contentW = maxX - minX + 1;
    const contentH = maxY - minY + 1;

    const iconBuf = Buffer.alloc(contentW * contentH * 4);

    for (let y = 0; y < contentH; y++) {
      for (let x = 0; x < contentW; x++) {
        const srcX = minX + x;
        const srcY = minY + y;
        const srcIdx = (srcY * width + srcX) * 3;
        const dstIdx = (y * contentW + x) * 4;

        const r = data[srcIdx];
        const g = data[srcIdx + 1];
        const b = data[srcIdx + 2];

        // Check if pixel is background checkerboard
        // Checkerboard pixels are neutral gray/white (r ≈ g ≈ b >= 230)
        const maxC = Math.max(r, g, b);
        const minC = Math.min(r, g, b);
        const diff = maxC - minC;

        // Distance from typical background gray (247, 247, 247)
        const dist = Math.sqrt((r - 247) ** 2 + (g - 247) ** 2 + (b - 247) ** 2);

        let alpha = 255;
        if (diff <= 3 && minC >= 230) {
          // Pure or near-pure checkerboard background pixel
          alpha = 0;
        } else if (diff <= 8 && minC >= 220) {
          // Anti-aliased transition edge
          alpha = Math.min(255, Math.max(0, Math.round((dist / 20) * 255)));
        }

        if (alpha > 0) {
          iconBuf[dstIdx] = r;
          iconBuf[dstIdx + 1] = g;
          iconBuf[dstIdx + 2] = b;
          iconBuf[dstIdx + 3] = alpha;
        } else {
          iconBuf[dstIdx] = 0;
          iconBuf[dstIdx + 1] = 0;
          iconBuf[dstIdx + 2] = 0;
          iconBuf[dstIdx + 3] = 0;
        }
      }
    }

    // Convert raw buffer to PNG
    const rawPngBuf = await sharp(iconBuf, {
      raw: { width: contentW, height: contentH, channels: 4 }
    }).png().toBuffer();

    // Target canvas 256x256, icon scaled to fit in 200x200 max inside canvas
    const targetCanvasSize = 256;
    const targetIconSize = 200;

    const scale = Math.min(targetIconSize / contentW, targetIconSize / contentH);
    const newW = Math.max(1, Math.round(contentW * scale));
    const newH = Math.max(1, Math.round(contentH * scale));

    const resizedContent = await sharp(rawPngBuf)
      .resize(newW, newH, { fit: 'contain' })
      .toBuffer();

    const left = Math.floor((targetCanvasSize - newW) / 2);
    const top = Math.floor((targetCanvasSize - newH) / 2);

    const finalPath = path.join(outDir, name);
    await sharp({
      create: {
        width: targetCanvasSize,
        height: targetCanvasSize,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
      .composite([{ input: resizedContent, left, top }])
      .png()
      .toFile(finalPath);

    console.log(`Saved ${name} (${contentW}x${contentH} -> ${newW}x${newH} centered at ${left},${top})`);
  }
}

// Blue Typical Day assets (from icons1.png)
const icons1 = [
  { name: 'welcome-star.png', bounds: [331, 168, 555, 387] },
  { name: 'learning-book.png', bounds: [748, 179, 965, 373] },
  { name: 'snack-apple.png', bounds: [334, 506, 545, 736] },
  { name: 'outdoors-tree.png', bounds: [742, 492, 971, 748] },
  { name: 'lunch-cutlery.png', bounds: [187, 867, 402, 1090] },
  { name: 'rest-moon.png', bounds: [535, 867, 742, 1090] },
  { name: 'play-ball.png', bounds: [865, 872, 1079, 1090] }
];

// Yellow Nursery Chef assets (from icons2.png)
const icons2 = [
  { name: 'try-tastes-bowl.png', bounds: [67, 499, 320, 732] },
  { name: 'develop-independence.png', bounds: [404, 456, 601, 722] },
  { name: 'positive-social-moments.png', bounds: [677, 503, 928, 721] },
  { name: 'dietary-information.png', bounds: [1001, 509, 1203, 712] }
];

// Purple Nutrition assets (from icons3.png)
const icons3 = [
  { name: 'wellbeing-heart.png', bounds: [531, 65, 723, 234] },
  { name: 'energy-lightning.png', bounds: [566, 298, 685, 471] },
  { name: 'mealtime-smile.png', bounds: [540, 525, 712, 699] },
  { name: 'wholesome-leaf.png', bounds: [549, 750, 710, 928] },
  { name: 'social-group.png', bounds: [521, 989, 730, 1131] }
];

// Green Operating Hours assets (from icons4.png)
const icons4 = [
  { name: 'calendar.png', bounds: [216, 195, 528, 525] },
  { name: 'full-day-sun.png', bounds: [698, 190, 1053, 539] },
  { name: 'half-day-sunrise.png', bounds: [182, 732, 561, 1033] },
  { name: 'attendance-heart.png', bounds: [735, 746, 1040, 1019] }
];

async function main() {
  console.log('Extracting 20 PNG assets...');
  await processSheet('icons1.png', icons1);
  await processSheet('icons2.png', icons2);
  await processSheet('icons3.png', icons3);
  await processSheet('icons4.png', icons4);
  console.log('Extraction complete!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
