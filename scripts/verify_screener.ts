import http from 'http';

function fetchPage(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  console.log('Testing Screener Page: http://localhost:3000/screener ...');
  const screenerHtml = await fetchPage('/screener');
  console.log('Contains Prime Tab:', screenerHtml.includes('東証プライム') || screenerHtml.includes('TSE Prime'));
  console.log('Contains Standard Tab:', screenerHtml.includes('東証スタンダード') || screenerHtml.includes('TSE Standard'));
  console.log('Contains Growth Tab:', screenerHtml.includes('東証グロース') || screenerHtml.includes('TSE Growth'));
  console.log('Contains PRO Market Tab:', screenerHtml.includes('TOKYO PRO Market'));
  console.log('Contains 33-Sector Filter:', screenerHtml.includes('東証33業種') || screenerHtml.includes('33 Sectors'));
  console.log('Contains Multi-Axis Sort Metric:', screenerHtml.includes('並び替え指標') || screenerHtml.includes('Sort Metric'));
}

main();
