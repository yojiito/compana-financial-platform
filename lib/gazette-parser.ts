/**
 * 官報決算公告パーサー (Official Gazette Parser)
 * 
 * 官報の決算公告テキスト/OCRデータから貸借対照表（BS）の数値を抽出します。
 */

export interface ParsedGazetteData {
  companyName?: string;
  fiscalPeriod?: number;
  periodEnd?: string;
  totalAssets?: number;
  currentAssets?: number;
  fixedAssets?: number;
  totalLiabilities?: number;
  currentLiabilities?: number;
  fixedLiabilities?: number;
  netAssets?: number;
  capitalStock?: number;
  capitalSurplus?: number;
  retainedEarnings?: number;
  netIncome?: number; // プラスは利益、マイナスは損失
  rawText: string;
}

export function parseGazetteText(text: string): ParsedGazetteData {
  const result: ParsedGazetteData = {
    rawText: text,
  };

  // 1. 決算期の抽出 (例: "第11期", "第5期")
  const periodMatch = text.match(/第\s*(\d+)\s*期/);
  if (periodMatch) {
    result.fiscalPeriod = parseInt(periodMatch[1], 10);
  }

  // 2. 決算期末日の抽出 (例: "2023年12月31日現在", "令和5年3月31日")
  const dateMatch = text.match(/(\d{4})年\s*(\d{1,2})月\s*(\d{1,2})日/);
  if (dateMatch) {
    const year = dateMatch[1];
    const month = dateMatch[2].padStart(2, '0');
    const day = dateMatch[3].padStart(2, '0');
    result.periodEnd = `${year}-${month}-${day}`;
  }

  // 3. 数字抽出ヘルパー (単位: 百万円 or 千円 or 円)
  const extractAmount = (pattern: RegExp): number | undefined => {
    const match = text.match(pattern);
    if (!match) return undefined;
    const numStr = match[1].replace(/,/g, '').replace(/\s/g, '');
    const val = parseFloat(numStr);
    return isNaN(val) ? undefined : val;
  };

  // 資産合計
  result.totalAssets = extractAmount(/資産合計\s*([0-9,]+)/) || extractAmount(/資産の部合計\s*([0-9,]+)/);
  
  // 流動資産・固定資産
  result.currentAssets = extractAmount(/流動資産\s*([0-9,]+)/);
  result.fixedAssets = extractAmount(/固定資産\s*([0-9,]+)/);

  // 負債合計
  result.totalLiabilities = extractAmount(/負債合計\s*([0-9,]+)/) || extractAmount(/負債の部合計\s*([0-9,]+)/);
  result.currentLiabilities = extractAmount(/流動負債\s*([0-9,]+)/);
  result.fixedLiabilities = extractAmount(/固定負債\s*([0-9,]+)/);

  // 純資産合計
  result.netAssets = extractAmount(/純資産合計\s*([0-9,]+)/) || extractAmount(/純資産の部合計\s*([0-9,]+)/);

  // 資本金・資本剰余金・利益剰余金
  result.capitalStock = extractAmount(/資本金\s*([0-9,]+)/);
  result.capitalSurplus = extractAmount(/資本剰余金\s*([0-9,]+)/);
  result.retainedEarnings = extractAmount(/利益剰余金\s*([0-9,\-]+)/);

  // 当期純利益 / 当期純損失
  const profitMatch = extractAmount(/当期純利益\s*([0-9,]+)/);
  const lossMatch = extractAmount(/当期純損失\s*([0-9,]+)/);

  if (profitMatch !== undefined) {
    result.netIncome = profitMatch;
  } else if (lossMatch !== undefined) {
    result.netIncome = -lossMatch;
  }

  return result;
}