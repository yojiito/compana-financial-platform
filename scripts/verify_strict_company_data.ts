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
  console.log('Testing note (5243) page on localhost:3000/stocks/5243 ...');
  const noteHtml = await fetchPage('/stocks/5243');

  console.log('Contains Representative "加藤 貞顕":', noteHtml.includes('加藤 貞顕'));
  console.log('Contains Headquarters "東京都港区北青山":', noteHtml.includes('東京都港区北青山'));
  console.log('Contains Employees "185名":', noteHtml.includes('185名'));
  console.log('Contains Salary "760万円":', noteHtml.includes('760万円'));
  console.log('Contains Bank "三菱UFJ銀行":', noteHtml.includes('三菱UFJ銀行'));
  console.log('Contains Real Revenue "3,420":', noteHtml.includes('3,420'));
  
  console.log('Is Dummy "¥1,000 億円" REMOVED:', !noteHtml.includes('¥1,000 億円'));
  console.log('Is Dummy "¥4,500 億円" REMOVED:', !noteHtml.includes('¥4,500 億円'));
  console.log('Is Dummy "国内主力生産工場" REMOVED:', !noteHtml.includes('国内主力生産工場'));
  console.log('Is Dummy "株式分割（1:5）を全期間に遡及反映" REMOVED:', !noteHtml.includes('株式分割（1:5）を全期間に遡及反映'));

  console.log('\nTesting Toyota (7203) page:');
  const toyotaHtml = await fetchPage('/stocks/7203');
  console.log('Contains "佐藤 恒治":', toyotaHtml.includes('佐藤 恒治'));
  console.log('Contains "愛知県豊田市":', toyotaHtml.includes('愛知県豊田市'));

  console.log('\nTesting Nintendo (7974) page:');
  const nintendoHtml = await fetchPage('/stocks/7974');
  console.log('Contains "古川 俊太郎":', nintendoHtml.includes('古川 俊太郎'));
  console.log('Contains "京都市南区":', nintendoHtml.includes('京都市南区'));
}

main();
