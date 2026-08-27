import axios from 'axios';

export interface EdinetDocumentItem {
  seqNumber: number;
  docID: string;
  edinetCode: string;
  secCode: string;
  JCN: string;
  filerName: string;
  fundCode: string;
  ordinanceCode: string;
  formCode: string;
  docTypeCode: string;
  periodStart: string;
  periodEnd: string;
  submitDateTime: string;
  docDescription: string;
  issuerEdinetCode: string;
  stockTransferStatus: string;
  disclosureStatus: string;
  xbrlFlag: string;
  pdfFlag: string;
  attachDocFlag: string;
  englishDocFlag: string;
}

export interface EdinetApiResponse {
  metadata: {
    title: string;
    date: string;
    status: string;
    message: string;
    resultset: {
      count: number;
    };
  };
  results: EdinetDocumentItem[];
}

export class EdinetClient {
  private apiKey: string;
  private baseUrl = 'https://api.edinet-fsa.go.jp/api/v2';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.EDINET_API_KEY || '';
  }

  /**
   * 指定日の開示書類一覧を取得 (type=2: メタデータ含む)
   */
  async getDocumentList(dateStr: string): Promise<EdinetApiResponse | null> {
    try {
      const url = `${this.baseUrl}/documents.json`;
      const params: Record<string, any> = {
        date: dateStr, // "YYYY-MM-DD"
        type: 2,
      };
      if (this.apiKey) {
        params['Subscription-Key'] = this.apiKey;
      }

      const res = await axios.get<EdinetApiResponse>(url, { params, timeout: 10000 });
      return res.data;
    } catch (error) {
      console.warn(`[EdinetClient] Failed to fetch documents for ${dateStr}:`, error);
      return null;
    }
  }

  /**
   * 特定の証券コードの有価証券報告書や大量保有報告書を検索
   */
  async findCompanyDisclosures(tickerCode: string, dateStr: string) {
    const list = await this.getDocumentList(dateStr);
    if (!list || !list.results) return [];

    // EDINETのsecCodeは5桁 (例: 72030)
    return list.results.filter(
      (doc) => doc.secCode && doc.secCode.startsWith(tickerCode)
    );
  }

  /**
   * 書類取得URLを生成
   * type 1: 提出本文書及び監査報告書 (zip)
   * type 2: PDF (pdf)
   * type 3: 代替書面・添付文書 (zip)
   * type 4: 英文ファイル (zip)
   * type 5: CSV (zip)
   */
  getDocumentDownloadUrl(docId: string, type: 1 | 2 | 3 | 4 | 5 = 2): string {
    const keyParam = this.apiKey ? `?Subscription-Key=${this.apiKey}` : '';
    return `${this.baseUrl}/documents/${docId}?type=${type}${keyParam ? '&' + keyParam.slice(1) : ''}`;
  }
}

export const edinet = new EdinetClient();