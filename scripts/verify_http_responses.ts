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
  console.log('Testing http://localhost:3000/ ...');
  const homeHtml = await fetchPage('/');
  console.log('Home contains "3,903":', homeHtml.includes('3,903'));
  console.log('Home contains "25":', homeHtml.includes('25'));

  console.log('\nTesting http://localhost:3000/unlisted ...');
  const unlistedHtml = await fetchPage('/unlisted');
  console.log('Unlisted contains "竹中工務店":', unlistedHtml.includes('竹中工務店'));
  console.log('Unlisted contains "YKK":', unlistedHtml.includes('YKK'));
  console.log('Unlisted contains "森ビル":', unlistedHtml.includes('森ビル'));
  console.log('Unlisted contains "新潮社":', unlistedHtml.includes('新潮社'));
  console.log('Unlisted contains "文藝春秋":', unlistedHtml.includes('文藝春秋'));
  console.log('Unlisted contains "秋田書店":', unlistedHtml.includes('秋田書店'));
  console.log('Unlisted contains "大創産業":', unlistedHtml.includes('大創産業'));
  console.log('Unlisted contains "アイリスオーヤマ":', unlistedHtml.includes('アイリスオーヤマ'));
  console.log('Unlisted contains "TBM":', unlistedHtml.includes('TBM'));

  console.log('\nTesting individual unlisted detail pages:');
  const takenakaHtml = await fetchPage('/unlisted/takenaka');
  console.log('Page /unlisted/takenaka contains "佐々木 正人":', takenakaHtml.includes('佐々木 正人'));

  const moriHtml = await fetchPage('/unlisted/mori-building');
  console.log('Page /unlisted/mori-building contains "辻 慎吾":', moriHtml.includes('辻 慎吾'));

  const shinchoshaHtml = await fetchPage('/unlisted/shinchosha');
  console.log('Page /unlisted/shinchosha contains "佐藤 隆信":', shinchoshaHtml.includes('佐藤 隆信'));
}

main();
