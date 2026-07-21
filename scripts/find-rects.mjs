import sharp from 'sharp';
import path from 'path';

async function findClusters(file, colorType) {
  const image = sharp(path.resolve('src/assets/images/' + file));
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  // Grid mask of foreground pixels
  const fg = new Uint8Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 3;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      const maxC = Math.max(r, g, b);
      const minC = Math.min(r, g, b);
      const diff = maxC - minC;

      let isFg = false;
      if (colorType === 'blue' && (b - Math.max(r,g) > 4 || maxC < 220)) isFg = true;
      if (colorType === 'green' && (g - Math.max(r,b) > 4 || maxC < 220)) isFg = true;
      if (colorType === 'yellow' && (Math.min(r,g) - b > 4 || maxC < 220)) isFg = true;
      if (colorType === 'purple' && (Math.min(r,b) - g > 4 || maxC < 220)) isFg = true;

      if (diff <= 5 && minC >= 230) isFg = false;

      if (isFg) fg[y * w + x] = 1;
    }
  }

  // Find connected components using BFS
  const visited = new Uint8Array(w * h);
  const clusters = [];

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pos = y * w + x;
      if (fg[pos] && !visited[pos]) {
        // Start BFS
        const queue = [pos];
        visited[pos] = 1;
        let minX = x, maxX = x, minY = y, maxY = y;
        let count = 0;

        while (queue.length > 0) {
          const curr = queue.pop();
          count++;
          const cx = curr % w;
          const cy = Math.floor(curr / w);

          if (cx < minX) minX = cx;
          if (cx > maxX) maxX = cx;
          if (cy < minY) minY = cy;
          if (cy > maxY) maxY = cy;

          // Check 8 neighbors
          for (let dy = -3; dy <= 3; dy++) {
            for (let dx = -3; dx <= 3; dx++) {
              const nx = cx + dx;
              const ny = cy + dy;
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                const npos = ny * w + nx;
                if (fg[npos] && !visited[npos]) {
                  visited[npos] = 1;
                  queue.push(npos);
                }
              }
            }
          }
        }

        // Only record clusters with significant pixel area
        if (count > 200) {
          clusters.push({ minX, minY, maxX, maxY, width: maxX - minX + 1, height: maxY - minY + 1, count });
        }
      }
    }
  }

  console.log(`=== ${file} (${colorType}) === found ${clusters.length} clusters:`);
  clusters.forEach((c, idx) => {
    console.log(`Cluster ${idx+1}: bounds=[${c.minX}, ${c.minY}, ${c.maxX}, ${c.maxY}], size=${c.width}x${c.height}, count=${c.count}`);
  });
}

async function main() {
  await findClusters('icons1.png', 'blue');
  await findClusters('icons2.png', 'yellow');
  await findClusters('icons3.png', 'purple');
  await findClusters('icons4.png', 'green');
}

main();
