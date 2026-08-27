import https from 'https';
import fs from 'fs';
import path from 'path';

const JPX_URL = 'https://www.jpx.co.jp/markets/statistics-equities/misc/tvdivq0000001vg2-att/data_j.xls';
const destPath = path.join(__dirname, 'data_j.xls');

console.log(`Downloading JPX master from: ${JPX_URL}`);

const file = fs.createWriteStream(destPath);
https.get(JPX_URL, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  if (res.statusCode !== 200) {
    console.error(`HTTP status: ${res.statusCode}`);
    return;
  }
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log(`Downloaded successfully to: ${destPath}`);
    const stats = fs.statSync(destPath);
    console.log(`File size: ${(stats.size / 1024).toFixed(1)} KB`);
  });
}).on('error', (err) => {
  console.error('Download error:', err);
});
