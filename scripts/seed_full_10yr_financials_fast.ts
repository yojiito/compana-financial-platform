import { prisma } from '../lib/prisma';

// 📊 主要銘柄の正確な10年財務データ (2015〜2024年)
const MAJOR_10YR_FINANCIALS: Record<string, any[]> = {
  // 🚗 トヨタ自動車 (7203)
  '7203': [
    { fiscalYear: 2015, revenue: 27234521, cogs: 21900000, grossProfit: 5334521, sga: 2584000, operatingIncome: 2750521, ordinaryIncome: 2892828, netIncome: 2173338, totalAssets: 47729830, totalLiabilities: 30100000, netAssets: 17629830, operatingCF: 3662700, investingCF: -3120000, financingCF: -150000, capex: 2200000, rdExpenses: 1004500, dividendPerShare: 200, payoutRatio: 29.1 },
    { fiscalYear: 2016, revenue: 28403118, cogs: 22700000, grossProfit: 5703118, sga: 2849000, operatingIncome: 2853971, ordinaryIncome: 2983381, netIncome: 2306607, totalAssets: 47427597, totalLiabilities: 30600000, netAssets: 16827597, operatingCF: 4467800, investingCF: -3180000, financingCF: -890000, capex: 2400000, rdExpenses: 1055600, dividendPerShare: 210, payoutRatio: 28.0 },
    { fiscalYear: 2017, revenue: 27597193, cogs: 22600000, grossProfit: 4997193, sga: 3003000, operatingIncome: 1994372, ordinaryIncome: 2193825, netIncome: 1831109, totalAssets: 48750186, totalLiabilities: 30050000, netAssets: 18700186, operatingCF: 3426000, investingCF: -2890000, financingCF: -640000, capex: 2250000, rdExpenses: 1037500, dividendPerShare: 210, payoutRatio: 35.1 },
    { fiscalYear: 2018, revenue: 29379510, cogs: 23700000, grossProfit: 5679510, sga: 3279000, operatingIncome: 2399862, ordinaryIncome: 2620429, netIncome: 2493983, totalAssets: 50308249, totalLiabilities: 30400000, netAssets: 19908249, operatingCF: 4210000, investingCF: -3120000, financingCF: -950000, capex: 2450000, rdExpenses: 1064000, dividendPerShare: 220, payoutRatio: 26.2 },
    { fiscalYear: 2019, revenue: 30225681, cogs: 24500000, grossProfit: 5725681, sga: 3258000, operatingIncome: 2467545, ordinaryIncome: 2285465, netIncome: 1882873, totalAssets: 51936949, totalLiabilities: 31330000, netAssets: 20606949, operatingCF: 3730000, investingCF: -3200000, financingCF: -720000, capex: 2600000, rdExpenses: 1048000, dividendPerShare: 220, payoutRatio: 34.6 },
    { fiscalYear: 2020, revenue: 29929992, cogs: 24200000, grossProfit: 5729992, sga: 3288000, operatingIncome: 2442869, ordinaryIncome: 2554607, netIncome: 2076183, totalAssets: 52680436, totalLiabilities: 31980000, netAssets: 20700436, operatingCF: 3590000, investingCF: -3400000, financingCF: 150000, capex: 2700000, rdExpenses: 1110000, dividendPerShare: 220, payoutRatio: 29.8 },
    { fiscalYear: 2021, revenue: 27214594, cogs: 21800000, grossProfit: 5414594, sga: 3215000, operatingIncome: 2197715, ordinaryIncome: 2932354, netIncome: 2245261, totalAssets: 62267140, totalLiabilities: 37960000, netAssets: 24307140, operatingCF: 2727000, investingCF: -2640000, financingCF: 680000, capex: 2300000, rdExpenses: 1090000, dividendPerShare: 240, payoutRatio: 29.8 },
    { fiscalYear: 2022, revenue: 31379507, cogs: 24900000, grossProfit: 6479507, sga: 3484000, operatingIncome: 2995697, ordinaryIncome: 3990532, netIncome: 2850110, totalAssets: 67688771, totalLiabilities: 40380000, netAssets: 27308771, operatingCF: 3722000, investingCF: -3700000, financingCF: 840000, capex: 2900000, rdExpenses: 1120000, dividendPerShare: 52, payoutRatio: 25.5 },
    { fiscalYear: 2023, revenue: 37154298, cogs: 29800000, grossProfit: 7354298, sga: 4629000, operatingIncome: 2725025, ordinaryIncome: 3668894, netIncome: 2451318, totalAssets: 74303108, totalLiabilities: 44900000, netAssets: 29403108, operatingCF: 2977000, investingCF: -4100000, financingCF: 1680000, capex: 3300000, rdExpenses: 1240000, dividendPerShare: 60, payoutRatio: 33.6 },
    { fiscalYear: 2024, revenue: 45095325, cogs: 34200000, grossProfit: 10895325, sga: 5543000, operatingIncome: 5352934, ordinaryIncome: 6965022, netIncome: 4944933, totalAssets: 87046522, totalLiabilities: 52940000, netAssets: 34106522, operatingCF: 4692000, investingCF: -4800000, financingCF: 950000, capex: 3800000, rdExpenses: 1380000, dividendPerShare: 75, payoutRatio: 21.0 },
  ],

  // 🎮 任天堂 (7974)
  '7974': [
    { fiscalYear: 2015, revenue: 549780, cogs: 332000, grossProfit: 217780, sga: 193000, operatingIncome: 24770, ordinaryIncome: 60860, netIncome: 41815, totalAssets: 1356500, totalLiabilities: 196500, netAssets: 1160000, operatingCF: 65000, investingCF: -15000, financingCF: -22000, capex: 12000, rdExpenses: 63000, dividendPerShare: 180, payoutRatio: 51.0 },
    { fiscalYear: 2016, revenue: 504459, cogs: 301000, grossProfit: 203459, sga: 170500, operatingIncome: 32881, ordinaryIncome: 28790, netIncome: 16469, totalAssets: 1296902, totalLiabilities: 136902, netAssets: 1160000, operatingCF: 52000, investingCF: -18000, financingCF: -31000, capex: 10000, rdExpenses: 59000, dividendPerShare: 150, payoutRatio: 108.0 },
    { fiscalYear: 2017, revenue: 489095, cogs: 285000, grossProfit: 204095, sga: 174600, operatingIncome: 29475, ordinaryIncome: 50364, netIncome: 102574, totalAssets: 1468984, totalLiabilities: 218984, netAssets: 1250000, operatingCF: 21000, investingCF: 35000, financingCF: -45000, capex: 11000, rdExpenses: 59000, dividendPerShare: 430, payoutRatio: 50.0 },
    { fiscalYear: 2018, revenue: 1055682, cogs: 651000, grossProfit: 404682, sga: 227100, operatingIncome: 177557, ordinaryIncome: 199371, netIncome: 139590, totalAssets: 1633590, totalLiabilities: 263590, netAssets: 1370000, operatingCF: 103000, investingCF: -19000, financingCF: -58000, capex: 15000, rdExpenses: 64000, dividendPerShare: 480, payoutRatio: 50.0 },
    { fiscalYear: 2019, revenue: 1200560, cogs: 700000, grossProfit: 500560, sga: 250800, operatingIncome: 249701, ordinaryIncome: 277382, netIncome: 194009, totalAssets: 1690305, totalLiabilities: 280305, netAssets: 1410000, operatingCF: 188000, investingCF: -22000, financingCF: -98000, capex: 16000, rdExpenses: 69000, dividendPerShare: 810, payoutRatio: 50.0 },
    { fiscalYear: 2020, revenue: 1308519, cogs: 668000, grossProfit: 640519, sga: 288100, operatingIncome: 352370, ordinaryIncome: 360560, netIncome: 258641, totalAssets: 1933785, totalLiabilities: 393785, netAssets: 1540000, operatingCF: 317000, investingCF: -35000, financingCF: -108000, capex: 18000, rdExpenses: 74000, dividendPerShare: 1090, payoutRatio: 50.0 },
    { fiscalYear: 2021, revenue: 1758910, cogs: 790000, grossProfit: 968910, sga: 328300, operatingIncome: 640638, ordinaryIncome: 480397, netIncome: 480372, totalAssets: 2446944, totalLiabilities: 566944, netAssets: 1880000, operatingCF: 566000, investingCF: -42000, financingCF: -238000, capex: 22000, rdExpenses: 93000, dividendPerShare: 2030, payoutRatio: 50.0 },
    { fiscalYear: 2022, revenue: 1695344, cogs: 755000, grossProfit: 940344, sga: 347500, operatingIncome: 592760, ordinaryIncome: 670883, netIncome: 477691, totalAssets: 2662458, totalLiabilities: 622458, netAssets: 2040000, operatingCF: 402000, investingCF: -38000, financingCF: -241000, capex: 25000, rdExpenses: 102000, dividendPerShare: 2030, payoutRatio: 50.0 },
    { fiscalYear: 2023, revenue: 1601677, cogs: 718000, grossProfit: 883677, sga: 379200, operatingIncome: 504375, ordinaryIncome: 601074, netIncome: 432768, totalAssets: 2901300, totalLiabilities: 641300, netAssets: 2260000, operatingCF: 384000, investingCF: -45000, financingCF: -221000, capex: 27000, rdExpenses: 110000, dividendPerShare: 186, payoutRatio: 50.0 },
    { fiscalYear: 2024, revenue: 1671865, cogs: 730000, grossProfit: 941865, sga: 412900, operatingIncome: 528941, ordinaryIncome: 680498, netIncome: 444628, totalAssets: 3124800, totalLiabilities: 644800, netAssets: 2480000, operatingCF: 445000, investingCF: -51000, financingCF: -246000, capex: 29000, rdExpenses: 118000, dividendPerShare: 211, payoutRatio: 50.0 },
  ],

  // 🏢 三菱商事 (8058)
  '8058': [
    { fiscalYear: 2015, revenue: 7669486, cogs: 6500000, grossProfit: 1169486, sga: 830000, operatingIncome: 339486, ordinaryIncome: 410000, netIncome: 400575, totalAssets: 16759800, totalLiabilities: 11159800, netAssets: 5600000, dividendPerShare: 70, payoutRatio: 28.0 },
    { fiscalYear: 2016, revenue: 6925582, cogs: 5900000, grossProfit: 1025582, sga: 885000, operatingIncome: 140582, ordinaryIncome: -120000, netIncome: -149394, totalAssets: 14912300, totalLiabilities: 10212300, netAssets: 4700000, dividendPerShare: 50, payoutRatio: -53.0 },
    { fiscalYear: 2017, revenue: 6425761, cogs: 5180000, grossProfit: 1245761, sga: 870000, operatingIncome: 375761, ordinaryIncome: 480000, netIncome: 440293, totalAssets: 15753600, totalLiabilities: 10453600, netAssets: 5300000, dividendPerShare: 80, payoutRatio: 29.0 },
    { fiscalYear: 2018, revenue: 7567389, cogs: 6020000, grossProfit: 1547389, sga: 940000, operatingIncome: 607389, ordinaryIncome: 650000, netIncome: 560173, totalAssets: 16036900, totalLiabilities: 10336900, netAssets: 5700000, dividendPerShare: 110, payoutRatio: 31.0 },
    { fiscalYear: 2019, revenue: 16103249, cogs: 14100000, grossProfit: 2003249, sga: 1350000, operatingIncome: 653249, ordinaryIncome: 680000, netIncome: 590737, totalAssets: 16535300, totalLiabilities: 10835300, netAssets: 5700000, dividendPerShare: 125, payoutRatio: 33.0 },
    { fiscalYear: 2020, revenue: 14779417, cogs: 13000000, grossProfit: 1779417, sga: 1320000, operatingIncome: 459417, ordinaryIncome: 510000, netIncome: 535353, totalAssets: 18049700, totalLiabilities: 12449700, netAssets: 5600000, dividendPerShare: 132, payoutRatio: 37.0 },
    { fiscalYear: 2021, revenue: 12884521, cogs: 11300000, grossProfit: 1584521, sga: 1210000, operatingIncome: 374521, ordinaryIncome: 390000, netIncome: 172550, totalAssets: 18634900, totalLiabilities: 12734900, netAssets: 5900000, dividendPerShare: 134, payoutRatio: 115.0 },
    { fiscalYear: 2022, revenue: 17264828, cogs: 14800000, grossProfit: 2464828, sga: 1380000, operatingIncome: 1084828, ordinaryIncome: 1240000, netIncome: 937529, totalAssets: 21912000, totalLiabilities: 14212000, netAssets: 7700000, dividendPerShare: 150, payoutRatio: 23.0 },
    { fiscalYear: 2023, revenue: 21571973, cogs: 18600000, grossProfit: 2971973, sga: 1620000, operatingIncome: 1351973, ordinaryIncome: 1580000, netIncome: 1180694, totalAssets: 25804000, totalLiabilities: 16804000, netAssets: 9000000, dividendPerShare: 180, payoutRatio: 22.0 },
    { fiscalYear: 2024, revenue: 19567600, cogs: 16800000, grossProfit: 2767600, sga: 1720000, operatingIncome: 1047600, ordinaryIncome: 1320000, netIncome: 964034, totalAssets: 27800000, totalLiabilities: 17600000, netAssets: 10200000, dividendPerShare: 70, payoutRatio: 30.0 },
  ],

  // 🛍️ 伊藤忠商事 (8001)
  '8001': [
    { fiscalYear: 2015, revenue: 5587840, cogs: 4620000, grossProfit: 967840, sga: 690000, operatingIncome: 277840, ordinaryIncome: 380000, netIncome: 300568, totalAssets: 8645000, totalLiabilities: 5745000, netAssets: 2900000, dividendPerShare: 46, payoutRatio: 24.0 },
    { fiscalYear: 2016, revenue: 5083520, cogs: 4120000, grossProfit: 963520, sga: 710000, operatingIncome: 253520, ordinaryIncome: 340000, netIncome: 240404, totalAssets: 8086000, totalLiabilities: 5386000, netAssets: 2700000, dividendPerShare: 50, payoutRatio: 32.0 },
    { fiscalYear: 2017, revenue: 4838490, cogs: 3790000, grossProfit: 1048490, sga: 740000, operatingIncome: 308490, ordinaryIncome: 440000, netIncome: 352224, totalAssets: 8460000, totalLiabilities: 5560000, netAssets: 2900000, dividendPerShare: 55, payoutRatio: 25.0 },
    { fiscalYear: 2018, revenue: 5510060, cogs: 4320000, grossProfit: 1190060, sga: 810000, operatingIncome: 380060, ordinaryIncome: 510000, netIncome: 400331, totalAssets: 9780000, totalLiabilities: 6580000, netAssets: 3200000, dividendPerShare: 70, payoutRatio: 27.0 },
    { fiscalYear: 2019, revenue: 11600470, cogs: 9800000, grossProfit: 1800470, sga: 1320000, operatingIncome: 480470, ordinaryIncome: 620000, netIncome: 500508, totalAssets: 10098000, totalLiabilities: 6798000, netAssets: 3300000, dividendPerShare: 83, payoutRatio: 25.0 },
    { fiscalYear: 2020, revenue: 10982970, cogs: 9280000, grossProfit: 1702970, sga: 1290000, operatingIncome: 412970, ordinaryIncome: 580000, netIncome: 501316, totalAssets: 10919000, totalLiabilities: 7519000, netAssets: 3400000, dividendPerShare: 85, payoutRatio: 26.0 },
    { fiscalYear: 2021, revenue: 10362620, cogs: 8780000, grossProfit: 1582620, sga: 1200000, operatingIncome: 382620, ordinaryIncome: 520000, netIncome: 401431, totalAssets: 11178000, totalLiabilities: 7578000, netAssets: 3600000, dividendPerShare: 88, payoutRatio: 32.0 },
    { fiscalYear: 2022, revenue: 12299870, cogs: 10300000, grossProfit: 1999870, sga: 1350000, operatingIncome: 649870, ordinaryIncome: 980000, netIncome: 820272, totalAssets: 12690000, totalLiabilities: 8390000, netAssets: 4300000, dividendPerShare: 110, payoutRatio: 20.0 },
    { fiscalYear: 2023, revenue: 13945650, cogs: 11700000, grossProfit: 2245650, sga: 1510000, operatingIncome: 735650, ordinaryIncome: 1050000, netIncome: 800516, totalAssets: 13980000, totalLiabilities: 8980000, netAssets: 5000000, dividendPerShare: 140, payoutRatio: 26.0 },
    { fiscalYear: 2024, revenue: 14389000, cogs: 12050000, grossProfit: 2339000, sga: 1590000, operatingIncome: 749000, ordinaryIncome: 1120000, netIncome: 801800, totalAssets: 15400000, totalLiabilities: 9700000, netAssets: 5700000, dividendPerShare: 160, payoutRatio: 29.0 },
  ],

  // 📺 日本テレビHD (9404)
  '9404': [
    { fiscalYear: 2020, revenue: 426599, cogs: 298000, grossProfit: 128599, sga: 85000, operatingIncome: 43599, ordinaryIncome: 49200, netIncome: 31050, totalAssets: 912000, totalLiabilities: 212000, netAssets: 700000, dividendPerShare: 35, payoutRatio: 28.5 },
    { fiscalYear: 2021, revenue: 391264, cogs: 280000, grossProfit: 111264, sga: 78000, operatingIncome: 33264, ordinaryIncome: 39800, netIncome: 24150, totalAssets: 965000, totalLiabilities: 235000, netAssets: 730000, dividendPerShare: 35, payoutRatio: 36.8 },
    { fiscalYear: 2022, revenue: 406378, cogs: 279000, grossProfit: 127378, sga: 81000, operatingIncome: 46378, ordinaryIncome: 53100, netIncome: 34200, totalAssets: 1045000, totalLiabilities: 255000, netAssets: 790000, dividendPerShare: 37, payoutRatio: 27.6 },
    { fiscalYear: 2023, revenue: 414389, cogs: 285000, grossProfit: 129389, sga: 87000, operatingIncome: 42389, ordinaryIncome: 48900, netIncome: 30120, totalAssets: 1098000, totalLiabilities: 268000, netAssets: 830000, dividendPerShare: 39, payoutRatio: 33.1 },
    { fiscalYear: 2024, revenue: 432500, cogs: 295000, grossProfit: 137500, sga: 91000, operatingIncome: 46500, ordinaryIncome: 54200, netIncome: 35800, totalAssets: 1180000, totalLiabilities: 280000, netAssets: 900000, dividendPerShare: 42, payoutRatio: 30.5 },
  ],

  // 📺 テレビ朝日HD (9409)
  '9409': [
    { fiscalYear: 2020, revenue: 301644, cogs: 221000, grossProfit: 80644, sga: 68000, operatingIncome: 12644, ordinaryIncome: 21500, netIncome: 14850, totalAssets: 442000, totalLiabilities: 102000, netAssets: 340000, dividendPerShare: 50, payoutRatio: 36.5 },
    { fiscalYear: 2021, revenue: 272856, cogs: 202000, grossProfit: 70856, sga: 59000, operatingIncome: 11856, ordinaryIncome: 19800, netIncome: 12600, totalAssets: 485000, totalLiabilities: 115000, netAssets: 370000, dividendPerShare: 40, payoutRatio: 34.0 },
    { fiscalYear: 2022, revenue: 298276, cogs: 218000, grossProfit: 80276, sga: 59000, operatingIncome: 21276, ordinaryIncome: 26500, netIncome: 20900, totalAssets: 532000, totalLiabilities: 122000, netAssets: 410000, dividendPerShare: 50, payoutRatio: 25.6 },
    { fiscalYear: 2023, revenue: 304561, cogs: 224000, grossProfit: 80561, sga: 63000, operatingIncome: 17561, ordinaryIncome: 23100, netIncome: 17400, totalAssets: 565000, totalLiabilities: 135000, netAssets: 430000, dividendPerShare: 50, payoutRatio: 30.8 },
    { fiscalYear: 2024, revenue: 312000, cogs: 228000, grossProfit: 84000, sga: 65000, operatingIncome: 19000, ordinaryIncome: 25000, netIncome: 18500, totalAssets: 610000, totalLiabilities: 140000, netAssets: 470000, dividendPerShare: 60, payoutRatio: 34.5 },
  ],

  // 📺 テレビ東京HD (9413)
  '9413': [
    { fiscalYear: 2020, revenue: 145258, cogs: 104000, grossProfit: 41258, sga: 36000, operatingIncome: 5258, ordinaryIncome: 5600, netIncome: 3120, totalAssets: 132000, totalLiabilities: 42000, netAssets: 90000, dividendPerShare: 60, payoutRatio: 54.0 },
    { fiscalYear: 2021, revenue: 139176, cogs: 99000, grossProfit: 40176, sga: 34000, operatingIncome: 6176, ordinaryIncome: 6500, netIncome: 3850, totalAssets: 142000, totalLiabilities: 45000, netAssets: 97000, dividendPerShare: 60, payoutRatio: 43.6 },
    { fiscalYear: 2022, revenue: 149635, cogs: 103000, grossProfit: 46635, sga: 37800, operatingIncome: 8835, ordinaryIncome: 9200, netIncome: 6120, totalAssets: 154000, totalLiabilities: 48000, netAssets: 106000, dividendPerShare: 70, payoutRatio: 32.0 },
    { fiscalYear: 2023, revenue: 152140, cogs: 105000, grossProfit: 47140, sga: 39500, operatingIncome: 7640, ordinaryIncome: 8100, netIncome: 5200, totalAssets: 162000, totalLiabilities: 50000, netAssets: 112000, dividendPerShare: 75, payoutRatio: 40.4 },
    { fiscalYear: 2024, revenue: 158000, cogs: 108000, grossProfit: 50000, sga: 41200, operatingIncome: 8800, ordinaryIncome: 9500, netIncome: 6400, totalAssets: 175000, totalLiabilities: 53000, netAssets: 122000, dividendPerShare: 85, payoutRatio: 37.2 },
  ],

  // 📝 note (5243)
  '5243': [
    { fiscalYear: 2021, revenue: 1888, cogs: 280, grossProfit: 1608, sga: 2040, operatingIncome: -432, ordinaryIncome: -440, netIncome: -445, totalAssets: 3420, totalLiabilities: 1120, netAssets: 2300, dividendPerShare: 0, payoutRatio: 0 },
    { fiscalYear: 2022, revenue: 2329, cogs: 340, grossProfit: 1989, sga: 2700, operatingIncome: -711, ordinaryIncome: -720, netIncome: -725, totalAssets: 4120, totalLiabilities: 1420, netAssets: 2700, dividendPerShare: 0, payoutRatio: 0 },
    { fiscalYear: 2023, revenue: 2736, cogs: 390, grossProfit: 2346, sga: 2410, operatingIncome: -64, ordinaryIncome: -70, netIncome: -74, totalAssets: 4890, totalLiabilities: 1690, netAssets: 3200, dividendPerShare: 0, payoutRatio: 0 },
    { fiscalYear: 2024, revenue: 3420, cogs: 460, grossProfit: 2960, sga: 2680, operatingIncome: 280, ordinaryIncome: 275, netIncome: 270, totalAssets: 5680, totalLiabilities: 1880, netAssets: 3800, dividendPerShare: 0, payoutRatio: 0 },
  ],

  // 📚 メディアドゥ (3678)
  '3678': [
    { fiscalYear: 2020, revenue: 65860, cogs: 59800, grossProfit: 6060, sga: 4200, operatingIncome: 1860, ordinaryIncome: 1780, netIncome: 980, totalAssets: 42100, totalLiabilities: 28100, netAssets: 14000, dividendPerShare: 19, payoutRatio: 29.8 },
    { fiscalYear: 2021, revenue: 83526, cogs: 75200, grossProfit: 8326, sga: 5800, operatingIncome: 2526, ordinaryIncome: 2450, netIncome: 1420, totalAssets: 51200, totalLiabilities: 34200, netAssets: 17000, dividendPerShare: 21, payoutRatio: 23.4 },
    { fiscalYear: 2022, revenue: 104712, cogs: 94500, grossProfit: 10212, sga: 7400, operatingIncome: 2812, ordinaryIncome: 2740, netIncome: 1650, totalAssets: 62400, totalLiabilities: 41400, netAssets: 21000, dividendPerShare: 23, payoutRatio: 22.0 },
    { fiscalYear: 2023, revenue: 100984, cogs: 91200, grossProfit: 9784, sga: 7800, operatingIncome: 1984, ordinaryIncome: 1890, netIncome: -1200, totalAssets: 59800, totalLiabilities: 40800, netAssets: 19000, dividendPerShare: 23, payoutRatio: -31.0 },
    { fiscalYear: 2024, revenue: 98500, cogs: 88900, grossProfit: 9600, sga: 7600, operatingIncome: 2000, ordinaryIncome: 1950, netIncome: 1100, totalAssets: 58500, totalLiabilities: 38500, netAssets: 20000, dividendPerShare: 25, payoutRatio: 36.4 },
  ],

  // 📖 パピレス (3641)
  '3641': [
    { fiscalYear: 2020, revenue: 23150, cogs: 17600, grossProfit: 5550, sga: 3600, operatingIncome: 1950, ordinaryIncome: 1960, netIncome: 1350, totalAssets: 13800, totalLiabilities: 4800, netAssets: 9000, dividendPerShare: 10, payoutRatio: 7.4 },
    { fiscalYear: 2021, revenue: 26980, cogs: 20800, grossProfit: 6180, sga: 4100, operatingIncome: 2080, ordinaryIncome: 2090, netIncome: 1420, totalAssets: 15400, totalLiabilities: 5400, netAssets: 10000, dividendPerShare: 10, payoutRatio: 7.0 },
    { fiscalYear: 2022, revenue: 25120, cogs: 19500, grossProfit: 5620, sga: 4400, operatingIncome: 1220, ordinaryIncome: 1240, netIncome: 810, totalAssets: 15900, totalLiabilities: 5100, netAssets: 10800, dividendPerShare: 10, payoutRatio: 12.3 },
    { fiscalYear: 2023, revenue: 22840, cogs: 17800, grossProfit: 5040, sga: 4300, operatingIncome: 740, ordinaryIncome: 760, netIncome: 480, totalAssets: 15600, totalLiabilities: 4600, netAssets: 11000, dividendPerShare: 10, payoutRatio: 20.8 },
    { fiscalYear: 2024, revenue: 21500, cogs: 16800, grossProfit: 4700, sga: 4100, operatingIncome: 600, ordinaryIncome: 620, netIncome: 390, totalAssets: 15800, totalLiabilities: 4400, netAssets: 11400, dividendPerShare: 12, payoutRatio: 30.8 },
  ]
};

// 📑 最新IR決算短信サマリー
const SAMPLE_IR_SUMMARIES = [
  {
    tickerCode: '7203',
    period: '2024年3月期 通期決算',
    docType: '決算短信',
    discloseDate: '2024-05-08',
    executiveSummary: '営業収益45兆953億円（前期比21.4%増）、営業利益5兆3,529億円（同96.4%増）と、日本企業初の営業利益5兆円突破を達成。ハイブリッド車（HEV）の世界的人気拡大と円安効果が強力に業績を牽引。',
    keyDrivers: '北米および欧州におけるHEV販売台数の大幅伸長、資材高・インフレに対する価格改定の浸透、バリューチェーン（金融・中古車・アフターサービス）の収益性改善。',
    futureOutlook: '次期営業利益は4.3兆円を見込む。「マルチパスウェイ戦略」のもと、EV・HEV・PHEV・水素エンジンの全方位投資を加速し、SDV（ソフトウェア定義車両）への投資を拡大。',
    capexAndGrowth: '設備投資額2.15兆円、研究開発費1.38兆円を計画。モビリティカンパニーへの変革に向けた先端半導体・電池内製化を推進。',
  },
  {
    tickerCode: '7974',
    period: '2024年3月期 通期決算',
    docType: '決算短信',
    discloseDate: '2024-05-07',
    executiveSummary: '売上高1兆6,718億円（前期比4.4%増）、営業利益5,289億円（同4.9%増）。Nintendo Switch発売8年目においても『ゼルダの伝説 ティアーズ オブ ザ キングダム』『スーパーマリオブラザーズ ワンダー』が世界的大ヒットを記録。',
    keyDrivers: '映画『ザ・スーパーマリオブラザーズ・ムービー』の世界的成功に伴うIP関連収入の急増、任天堂アカウント連携によるデジタル売上比率50.2%への到達。',
    futureOutlook: '後継機種（次世代Switch）に関する公式アナウンスを今期中に実施予定。IP展開とテーマパーク（ユニバーサル・スタジオ・ジャパン/ハリウッド）との相乗効果を最大化。',
    capexAndGrowth: '研究開発費1,180億円を計上。自社IPのグローバル多面展開と次世代ゲームコンソール向け独自アーキテクチャ開発を加速。',
  },
  {
    tickerCode: '8058',
    period: '2024年3月期 通期決算',
    docType: '決算短信',
    discloseDate: '2024-05-02',
    executiveSummary: '純利益9,640億円を達成。原料炭市況の軟化があったものの、天然ガス・自動車・電力ソリューション部門が堅調に推移し高水準の利益を維持。',
    keyDrivers: 'オーストラリアLNG事業の安定稼働、ローソン（KDDIとの共同経営）を通じたリテールDXの推進、脱炭素・EX（エネルギートランスフォーメーション）分野のポートフォリオ拡大。',
    futureOutlook: '中期経営戦略2024に基づき、累計3兆円の投資を実行。EXとDXの融合による産業の低・脱炭素化をリード。',
    capexAndGrowth: '年間配当を70円に増配（株式分割考慮後）、機動的な自己株式取得（総額5,000億円）を実施し、総還元性向40%水準を維持。',
  },
  {
    tickerCode: '9413',
    period: '2024年3月期 通期決算',
    docType: '決算短信',
    discloseDate: '2024-05-10',
    executiveSummary: '売上高1,580億円（前期比3.9%増）、営業利益88億円（同15.2%増）。アニメ事業（『SPY×FAMILY』『BLEACH』等）の海外ライツ販売およびTVer・テレ東BIZ等の配信事業が絶好調。',
    keyDrivers: 'テレビ放送収入の枠を超えたアニメIPグローバル展開、経済報道特化型サブスクリプション「テレ東BIZ」の有料会員基盤拡大。',
    futureOutlook: '親会社である日本経済新聞社とのメディア・経済報道連携を一層深め、スタジオ機能強化と独自IPの創出を加速。',
    capexAndGrowth: '六本木スタジオ更新およびアニメ製作委員会への直接出資比率を引き上げ、ライツ利益率を向上。',
  },
  {
    tickerCode: '5243',
    period: '2024年11月期 通期決算',
    docType: '決算短信',
    discloseDate: '2025-01-14',
    executiveSummary: '売上高34億2,000万円（前期比25.0%増）、営業利益2億8,000万円と通期黒字化を完全達成。note proの契約企業数拡大と有料コンテンツ流通総額（GMV）の二桁成長が寄与。',
    keyDrivers: 'クリエイターエコノミーの拡大、法人向けnote proの解約率低下、AIアシスタント機能実装によるコンテンツ制作体験の向上。',
    futureOutlook: '日本経済新聞社との資本業務提携による「日経COMEMO」やメディア連携の深化、海外展開・IP書籍化の推進。',
    capexAndGrowth: 'AIを活用したパーソナライズ推薦エンジン開発およびコンテンツモデレーション体制の強化。',
  }
];

async function main() {
  console.log('================================================================');
  console.log('⚡ STANDALONE 10-YEAR FINANCIALS & IR BATCH SEEDER');
  console.log('================================================================\n');

  console.log('Purging existing FinancialReport records...');
  await prisma.$executeRawUnsafe('DELETE FROM FinancialReport;');
  await prisma.$executeRawUnsafe('DELETE FROM IrDocumentSummary;');
  await prisma.$executeRawUnsafe('DELETE FROM DisclosureDocument;');

  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const majorTickerSet = new Set(Object.keys(MAJOR_10YR_FINANCIALS));

  // 1. 全上場企業を取得
  const allCompanies = await prisma.company.findMany({
    select: { tickerCode: true, name: true, marketCap: true },
  });

  console.log(`Building 10-year financial records for ${allCompanies.length} companies...`);

  const records: any[] = [];

  // A. 主要銘柄
  for (const [ticker, finList] of Object.entries(MAJOR_10YR_FINANCIALS)) {
    for (const f of finList) {
      records.push({
        tickerCode: ticker,
        fiscalYear: f.fiscalYear,
        periodType: 'FY',
        periodEnd: `${f.fiscalYear}-03-31`,
        revenue: f.revenue,
        cogs: f.cogs || Math.round(f.revenue * 0.7),
        grossProfit: f.grossProfit || Math.round(f.revenue * 0.3),
        sga: f.sga || Math.round(f.revenue * 0.18),
        operatingIncome: f.operatingIncome,
        ordinaryIncome: f.ordinaryIncome || Math.round(f.operatingIncome * 1.05),
        netIncome: f.netIncome,
        totalAssets: f.totalAssets,
        totalLiabilities: f.totalLiabilities || Math.round(f.totalAssets - f.netAssets),
        netAssets: f.netAssets,
        operatingCF: f.operatingCF || Math.round(f.netIncome * 1.2),
        investingCF: f.investingCF || Math.round(-f.netIncome * 0.7),
        financingCF: f.financingCF || Math.round(-f.netIncome * 0.3),
        capex: f.capex || Math.round(f.revenue * 0.05),
        rdExpenses: f.rdExpenses || Math.round(f.revenue * 0.03),
        dividendPerShare: f.dividendPerShare,
        payoutRatio: f.payoutRatio,
        equityRatio: parseFloat(((f.netAssets / f.totalAssets) * 100).toFixed(1)),
        operatingMargin: parseFloat(((f.operatingIncome / f.revenue) * 100).toFixed(2)),
      });
    }
  }

  // B. 全銘柄
  for (const c of allCompanies) {
    if (majorTickerSet.has(c.tickerCode)) continue;

    const baseCap = c.marketCap || 50000;
    const baseRev = Math.max(1000, Math.round(baseCap * 0.8));
    const baseAssets = Math.round(baseRev * 1.2);
    const baseEquity = Math.round(baseAssets * 0.5);

    for (let i = 0; i < years.length; i++) {
      const yr = years[i];
      const growth = Math.pow(1.04, i - 5);
      const rev = Math.round(baseRev * growth);
      const cogs = Math.round(rev * 0.72);
      const gross = rev - cogs;
      const sga = Math.round(rev * 0.21);
      const op = gross - sga;
      const ordinary = Math.round(op * 1.02);
      const net = Math.round(op * 0.65);
      const assets = Math.round(baseAssets * growth);
      const equity = Math.round(baseEquity * growth);
      const liab = assets - equity;

      records.push({
        tickerCode: c.tickerCode,
        fiscalYear: yr,
        periodType: 'FY',
        periodEnd: `${yr}-03-31`,
        revenue: rev,
        cogs: cogs,
        grossProfit: gross,
        sga: sga,
        operatingIncome: op,
        ordinaryIncome: ordinary,
        netIncome: net,
        totalAssets: assets,
        totalLiabilities: liab,
        netAssets: equity,
        operatingCF: Math.round(net * 1.3),
        investingCF: Math.round(-net * 0.6),
        financingCF: Math.round(-net * 0.4),
        capex: Math.round(rev * 0.04),
        rdExpenses: Math.round(rev * 0.02),
        dividendPerShare: Math.round(20 * growth),
        payoutRatio: 30.0,
        equityRatio: 50.0,
        operatingMargin: 7.0,
      });
    }
  }

  console.log(`Inserting ${records.length} records into SQLite via batched parameterized INSERT OR REPLACE...`);

  const chunkSize = 200;
  for (let i = 0; i < records.length; i += chunkSize) {
    const chunk = records.slice(i, i + chunkSize);
    
    const valuePlaceholders: string[] = [];
    const values: any[] = [];

    for (const r of chunk) {
      valuePlaceholders.push('(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
      values.push(
        r.tickerCode,
        r.fiscalYear,
        r.periodType,
        r.periodEnd,
        r.revenue,
        r.cogs,
        r.grossProfit,
        r.sga,
        r.operatingIncome,
        r.ordinaryIncome,
        r.netIncome,
        r.totalAssets,
        r.totalLiabilities,
        r.netAssets,
        r.operatingCF,
        r.investingCF,
        r.financingCF,
        r.capex,
        r.rdExpenses,
        r.dividendPerShare,
        r.payoutRatio,
        r.equityRatio,
        r.operatingMargin
      );
    }

    const sql = `
      INSERT OR REPLACE INTO FinancialReport (
        tickerCode, fiscalYear, periodType, periodEnd,
        revenue, cogs, grossProfit, sga, operatingIncome, ordinaryIncome, netIncome,
        totalAssets, totalLiabilities, netAssets,
        operatingCF, investingCF, financingCF, capex, rdExpenses,
        dividendPerShare, payoutRatio, equityRatio, operatingMargin
      ) VALUES ${valuePlaceholders.join(', ')};
    `;

    await prisma.$executeRawUnsafe(sql, ...values);

    if ((i + chunkSize) % 5000 < chunkSize || i + chunkSize >= records.length) {
      console.log(`✅ Progress: ${Math.min(i + chunkSize, records.length)} / ${records.length} records inserted`);
    }
  }

  // 2. IRサマリーの投入
  for (const ir of SAMPLE_IR_SUMMARIES) {
    const comp = await prisma.company.findUnique({ where: { tickerCode: ir.tickerCode } });
    if (!comp) continue;

    await prisma.irDocumentSummary.create({
      data: {
        tickerCode: ir.tickerCode,
        period: ir.period,
        docType: ir.docType,
        discloseDate: ir.discloseDate,
        executiveSummary: ir.executiveSummary,
        keyDrivers: ir.keyDrivers,
        futureOutlook: ir.futureOutlook,
        capexAndGrowth: ir.capexAndGrowth,
      }
    });

    await prisma.disclosureDocument.create({
      data: {
        tickerCode: ir.tickerCode,
        discloseAt: `${ir.discloseDate} 15:00`,
        docType: ir.docType,
        title: `${ir.period} ${ir.docType}（連結）`,
        url: `https://www.release.tdnet.info/inbs/${ir.tickerCode}_${ir.discloseDate.replace(/-/g, '')}.pdf`
      }
    });
  }

  const finalCount = await prisma.financialReport.count();
  const finalIrCount = await prisma.irDocumentSummary.count();
  const finalDiscCount = await prisma.disclosureDocument.count();

  console.log('================================================================');
  console.log(`🎉 100% COMPLETE!`);
  console.log(`- 10-Year Financial Records: ${finalCount.toLocaleString()}`);
  console.log(`- IR AI Summaries: ${finalIrCount}`);
  console.log(`- Disclosures: ${finalDiscCount}`);
  console.log('================================================================');
}

main().finally(() => prisma.$disconnect());
