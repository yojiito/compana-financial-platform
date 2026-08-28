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
  console.log('Testing Toyota (7203) Detail Page:');
  const toyotaHtml = await fetchPage('/stocks/7203');
  console.log('Contains Toyota Name:', toyotaHtml.includes('トヨタ自動車'));
  console.log('Contains 10-Yr Financials Tab:', toyotaHtml.includes('財務3表推移') || toyotaHtml.includes('Financial Statements'));
  console.log('Contains AI IR Filings Summary Tab:', toyotaHtml.includes('有報・決算短信 AI要約') || toyotaHtml.includes('AI IR Filings'));
  console.log('Contains Cost & Profit Anatomy Tab:', toyotaHtml.includes('儲けのカラクリ') || toyotaHtml.includes('Profit Anatomy'));

  console.log('\nTesting Nintendo (7974) Detail Page:');
  const nintendoHtml = await fetchPage('/stocks/7974');
  console.log('Contains Nintendo Name:', nintendoHtml.includes('任天堂'));

  console.log('\nTesting Nikkei TV Tokyo (9413) Detail Page:');
  const tvtokyoHtml = await fetchPage('/stocks/9413');
  console.log('Contains TV Tokyo Name:', tvtokyoHtml.includes('テレビ東京'));

  console.log('\nTesting note (5243) Detail Page:');
  const noteHtml = await fetchPage('/stocks/5243');
  console.log('Contains note Name:', noteHtml.includes('ｎｏｔｅ') || noteHtml.includes('note'));
}

main();
