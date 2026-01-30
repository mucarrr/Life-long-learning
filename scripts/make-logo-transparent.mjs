/**
 * Beyaz (veya çok açık) arka planı şeffaf yapar.
 * Kullanım: node scripts/make-logo-transparent.mjs
 * Girdi: public/images/LLG.png → aynı dosya güncellenir (yedek alınır).
 */

import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const inputPath = path.join(root, "public/images/LLG.png");
const backupPath = path.join(root, "public/images/LLG.backup.png");
const outputPath = path.join(root, "public/images/LLG.png");

// Tam şeffaf: RGB hepsi bu değerin üzerindeyse alpha = 0
const THRESHOLD_FULL = 210;
// Yumuşak geçiş: bu değerin üzerindeki pikseller kademeli şeffaflık (beyaz kenar kaybolur)
const THRESHOLD_SOFT = 235;

if (!existsSync(inputPath)) {
  console.error("Dosya bulunamadı: public/images/LLG.png");
  process.exit(1);
}

async function main() {
  const image = sharp(inputPath);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  const len = data.length;

  for (let i = 0; i < len; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const avg = (r + g + b) / 3;

    if (avg >= THRESHOLD_FULL) {
      if (avg >= THRESHOLD_SOFT) {
        data[i + 3] = 0;
      } else {
        const t = (avg - THRESHOLD_FULL) / (THRESHOLD_SOFT - THRESHOLD_FULL);
        data[i + 3] = Math.round(255 * (1 - t));
      }
    }
  }

  const outBuffer = await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toBuffer();

  writeFileSync(backupPath, readFileSync(inputPath));
  writeFileSync(outputPath, outBuffer);
  console.log("Tamam. Yedek: public/images/LLG.backup.png");
  console.log("LLG.png güncellendi (beyaz arka plan şeffaf).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
