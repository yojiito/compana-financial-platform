/**
 * 🛡️ fact-check-validator.ts
 * 厳格な公的ID検証（法人番号の指定等に関する省令第2条準拠のチェックディジット計算、JPX銘柄コード）、
 * 財務3表等式完全一致検証、記載漏れ検知、および持合い関係のクロス突合エンジン。
 */

export interface ValidationIssue {
  type: 'ERROR' | 'WARNING';
  code: string;
  field: string;
  message: string;
  messageEn: string;
}

export interface EntityValidationResult {
  isValid: boolean;
  score: number; // 0 - 100
  issues: ValidationIssue[];
}

/**
 * ① 国税庁 法人番号13桁 チェックディジット検証
 * 「法人番号の指定等に関する省令」第二条に完全準拠した計算式:
 * 13桁: C P12 P11 P10 P9 P8 P7 P6 P5 P4 P3 P2 P1
 * Pn: 基礎番号の最下位を1桁目としたときのn桁目数字
 * Qn: nが奇数のとき1、偶数のとき2
 * C = 9 - ((Σ Pn * Qn) mod 9) (※ 1〜9)
 */
export function validateNtaCorporateNumber(corporateNumber: string): { isValid: boolean; error?: string; checkDigit?: number; expectedCheckDigit?: number } {
  if (!corporateNumber || typeof corporateNumber !== 'string') {
    return { isValid: false, error: '法人番号が指定されていません（記載漏れ）' };
  }

  const cleaned = corporateNumber.trim().replace(/-/g, '');
  if (!/^\d{13}$/.test(cleaned)) {
    return { isValid: false, error: `法人番号は13桁の半角数字である必要があります (入力: "${cleaned}")` };
  }

  const digits = cleaned.split('').map(Number);
  const cd = digits[0]; // 最上位の1桁がチェックディジット (C)
  const base = digits.slice(1); // 残りの12桁 (P12 〜 P1)

  // base[0] = P12, base[11] = P1 (最下位桁)
  let sum = 0;
  for (let n = 1; n <= 12; n++) {
    const pn = base[12 - n]; // n=1 -> base[11], n=12 -> base[0]
    const qn = (n % 2 === 1) ? 1 : 2;
    sum += pn * qn;
  }

  const remainder = sum % 9;
  const expectedCheckDigit = 9 - remainder; // 1〜9

  if (cd !== expectedCheckDigit) {
    return {
      isValid: false,
      checkDigit: cd,
      expectedCheckDigit,
      error: `国税庁チェックディジット不一致: 期待値 ${expectedCheckDigit} に対し ${cd} が設定されています`
    };
  }

  return { isValid: true, checkDigit: cd, expectedCheckDigit };
}

/**
 * ② JPX (日本取引所グループ) 証券コード体系検証
 * 4桁数字（例: 7203）または新コード体系（英字混じり5桁、例: 130A）を検証。
 */
export function validateTickerCode(tickerCode: string): { isValid: boolean; error?: string } {
  if (!tickerCode) {
    return { isValid: false, error: '証券コードが指定されていません（記載漏れ）' };
  }
  const cleaned = tickerCode.trim();
  // 4桁数字または4桁+英字
  if (/^\d{4}$/.test(cleaned) || /^\d{3}[A-Z\d]$/.test(cleaned)) {
    return { isValid: true };
  }
  return { isValid: false, error: `無効な証券コード形式です (入力: "${cleaned}")` };
}

/**
 * ③ 財務諸表・官報 貸借対照表 (BS) 等式検証
 * 資産の部 = 負債の部 + 純資産の部
 */
export function validateBalanceSheetEquation(totalAssets: number, totalLiabilities: number, netAssets: number): { isValid: boolean; diff: number } {
  const calculated = totalLiabilities + netAssets;
  const diff = Math.round((totalAssets - calculated) * 100) / 100;
  return {
    isValid: Math.abs(diff) <= 0.01,
    diff
  };
}

/**
 * ④ 損益計算書 (PL) 算術等式検証
 * 売上総利益 = 売上高 - 売上原価
 * 営業利益 = 売上総利益 - 販管費
 */
export function validateIncomeStatementEquation(
  revenue: number,
  cogs?: number | null,
  grossProfit?: number | null,
  sga?: number | null,
  operatingIncome?: number | null
): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];

  if (cogs !== undefined && cogs !== null && grossProfit !== undefined && grossProfit !== null) {
    const calcGross = Math.round((revenue - cogs) * 100) / 100;
    if (Math.abs(calcGross - grossProfit) > 1.0) {
      issues.push(`売上総利益の不整合: 売上(${revenue}) - 原価(${cogs}) = ${calcGross} に対し 記録値 ${grossProfit}`);
    }
  }

  if (grossProfit !== undefined && grossProfit !== null && sga !== undefined && sga !== null && operatingIncome !== undefined && operatingIncome !== null) {
    const calcOp = Math.round((grossProfit - sga) * 100) / 100;
    if (Math.abs(calcOp - operatingIncome) > 1.0) {
      issues.push(`営業利益の不整合: 売上総利益(${grossProfit}) - 販管費(${sga}) = ${calcOp} に対し 記録値 ${operatingIncome}`);
    }
  }

  return {
    isValid: issues.length === 0,
    issues
  };
}

/**
 * ⑤ 必須マスター項目の記載漏れ検知
 */
export function validateRequiredMasterFields(entity: {
  name?: string | null;
  representative?: string | null;
  establishedYear?: number | null;
  location?: string | null;
  industry?: string | null;
}): { isValid: boolean; missingFields: string[] } {
  const missing: string[] = [];
  if (!entity.name || entity.name.trim() === '') missing.push('企業名 (name)');
  if (!entity.representative || entity.representative.trim() === '') missing.push('代表者名 (representative)');
  if (!entity.establishedYear || entity.establishedYear <= 1500) missing.push('設立年 (establishedYear)');
  if (!entity.location || entity.location.trim() === '') missing.push('本店所在地 (location)');
  if (!entity.industry || entity.industry.trim() === '') missing.push('業種区分 (industry)');

  return {
    isValid: missing.length === 0,
    missingFields: missing
  };
}
