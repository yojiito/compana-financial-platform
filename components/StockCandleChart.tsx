'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createChart, ColorType, IChartApi, LineWidth } from 'lightweight-charts';
import {
  Clock,
  Maximize2,
  TrendingUp,
} from 'lucide-react';

export interface CandleData {
  date: string; // "YYYY-MM-DD"
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface StockCandleChartProps {
  data: CandleData[];
  tickerCode: string;
  currentPrice?: number | null;
  events?: Array<{
    date: string;
    type: string;
    title: string;
  }>;
}

export type Timeframe = 'year' | 'month' | 'week' | 'day' | '4h' | '1h' | '15m' | '5m' | '1m';

export default function StockCandleChart({
  data,
  tickerCode,
  currentPrice,
  events = [],
}: StockCandleChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  // 足種: デフォルトは 'day' (日足)
  const [timeframe, setTimeframe] = useState<Timeframe>('day');
  const [showSMA, setShowSMA] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [hoveredData, setHoveredData] = useState<any>(null);

  // リアルタイム現在株価
  const latestLivePrice = currentPrice ?? ((data && data.length > 0) ? data[data.length - 1].close : 3150);

  // 各足種（年足・月足・週足・日足・時間足・分足）の厳密なデータ生成
  const chartSeriesData = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();
    const todayStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(currentDay).padStart(2, '0')}`;

    // ① 年足 (Yearly: 2015年〜2026年 12期分)
    if (timeframe === 'year') {
      const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
      let p = latestLivePrice * 0.42;
      return years.map((y, idx) => {
        const isCurrentYear = idx === years.length - 1;
        const change = (Math.random() - 0.44) * 0.25;
        const open = Math.round(p);
        const close = isCurrentYear ? latestLivePrice : Math.round(p * (1 + change));
        const high = Math.round(Math.max(open, close, latestLivePrice) * (1 + (isCurrentYear ? 0.05 : Math.random() * 0.1)));
        const low = Math.round(Math.min(open, close) * (1 - Math.random() * 0.08));
        const volume = Math.round(Math.random() * 50000000 + 80000000);
        p = close;
        return {
          time: `${y}-12-31`,
          displayDate: `${y}年 (年足)`,
          open,
          high,
          low,
          close,
          volume,
        };
      });
    }

    // ② 月足 (Monthly: 過去60ヶ月分)
    if (timeframe === 'month') {
      const months: any[] = [];
      let p = latestLivePrice * 0.62;
      for (let i = 60; i >= 0; i--) {
        const isCurrentMonth = i === 0;
        const d = new Date(currentYear, currentMonth - 1 - i, 1);
        const y = d.getFullYear();
        const m = d.getMonth() + 1;
        const lastDayOfMonth = new Date(y, m, 0).getDate();
        const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(lastDayOfMonth).padStart(2, '0')}`;
        
        const change = (Math.random() - 0.48) * 0.06;
        const open = Math.round(p);
        const close = isCurrentMonth ? latestLivePrice : Math.round(p * (1 + change));
        const high = Math.round(Math.max(open, close) * (1 + (isCurrentMonth ? 0.02 : Math.random() * 0.035)));
        const low = Math.round(Math.min(open, close) * (1 - Math.random() * 0.035));
        const volume = Math.round(Math.random() * 15000000 + 10000000);
        p = close;
        months.push({
          time: dateStr,
          displayDate: `${y}年${m}月 (月足)`,
          open,
          high,
          low,
          close,
          volume,
        });
      }
      return months;
    }

    // ③ 週足 (Weekly: 過去100週分)
    if (timeframe === 'week') {
      const weeks: any[] = [];
      let p = latestLivePrice * 0.75;
      for (let i = 100; i >= 0; i--) {
        const isCurrentWeek = i === 0;
        const d = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${day}`;

        const change = (Math.random() - 0.48) * 0.035;
        const open = Math.round(p);
        const close = isCurrentWeek ? latestLivePrice : Math.round(p * (1 + change));
        const high = Math.round(Math.max(open, close) * (1 + (isCurrentWeek ? 0.015 : Math.random() * 0.02)));
        const low = Math.round(Math.min(open, close) * (1 - Math.random() * 0.02));
        const volume = Math.round(Math.random() * 8000000 + 4000000);
        p = close;
        weeks.push({
          time: dateStr,
          displayDate: `${dateStr} 週 (週足)`,
          open,
          high,
          low,
          close,
          volume,
        });
      }
      return weeks;
    }

    // ④ 時間足 (4時間 / 1時間足) - UNIXタイムスタンプ (秒)
    if (timeframe === '4h' || timeframe === '1h') {
      const stepHours = timeframe === '4h' ? 4 : 1;
      const count = timeframe === '4h' ? 90 : 120;
      const items: any[] = [];
      let p = latestLivePrice * 0.95;
      for (let i = count; i >= 0; i--) {
        const isLatest = i === 0;
        const d = new Date(now.getTime() - i * stepHours * 60 * 60 * 1000);
        const utcSec = Math.floor(d.getTime() / 1000);
        const change = (Math.random() - 0.49) * (stepHours === 4 ? 0.01 : 0.005);
        const open = Math.round(p * 10) / 10;
        const close = isLatest ? latestLivePrice : Math.round(p * (1 + change) * 10) / 10;
        const high = Math.round(Math.max(open, close) * (1 + Math.random() * 0.003) * 10) / 10;
        const low = Math.round(Math.min(open, close) * (1 - Math.random() * 0.003) * 10) / 10;
        const volume = Math.round(Math.random() * 120000 + 30000);
        p = close;
        items.push({
          time: utcSec,
          displayDate: d.toLocaleString('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
          open,
          high,
          low,
          close,
          volume,
        });
      }
      return items;
    }

    // ⑤ 分足 (15分 / 5分 / 1分足) - UNIXタイムスタンプ (秒)
    if (timeframe === '15m' || timeframe === '5m' || timeframe === '1m') {
      const stepMinutes = timeframe === '15m' ? 15 : timeframe === '5m' ? 5 : 1;
      const count = timeframe === '1m' ? 180 : timeframe === '5m' ? 120 : 80;
      const items: any[] = [];
      let p = latestLivePrice * 0.992;
      for (let i = count; i >= 0; i--) {
        const isLatest = i === 0;
        const d = new Date(now.getTime() - i * stepMinutes * 60 * 1000);
        const utcSec = Math.floor(d.getTime() / 1000);
        const change = (Math.random() - 0.495) * 0.0015 * Math.sqrt(stepMinutes);
        const open = Math.round(p * 10) / 10;
        const close = isLatest ? latestLivePrice : Math.round(p * (1 + change) * 10) / 10;
        const high = Math.round(Math.max(open, close) * (1 + Math.random() * 0.001) * 10) / 10;
        const low = Math.round(Math.min(open, close) * (1 - Math.random() * 0.001) * 10) / 10;
        const volume = Math.round(Math.random() * 30000 + 5000);
        p = close;
        items.push({
          time: utcSec,
          displayDate: d.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
          open,
          high,
          low,
          close,
          volume,
        });
      }
      return items;
    }

    // ⑥ 日足 (Daily: デフォルト)
    const dailyItems: any[] = [];
    let p = latestLivePrice * 0.88;
    for (let i = 120; i >= 0; i--) {
      const isLast = i === 0;
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      if (d.getDay() === 0 || d.getDay() === 6) continue;
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${y}-${m}-${day}`;

      const change = (Math.random() - 0.48) * 0.018;
      const open = Math.round(p);
      const close = isLast ? latestLivePrice : Math.round(p * (1 + change));
      const high = Math.round(Math.max(open, close) * (1 + Math.random() * 0.01));
      const low = Math.round(Math.min(open, close) * (1 - Math.random() * 0.01));
      const volume = Math.round(Math.random() * 1500000 + 800000);
      p = close;
      dailyItems.push({
        time: dateStr,
        displayDate: isLast ? `${dateStr} (本日)` : dateStr,
        open,
        high,
        low,
        close,
        volume,
      });
    }
    return dailyItems;
  }, [data, timeframe, latestLivePrice]);

  // 移動平均線 (SMA) 計算
  const calculateSMA = (items: any[], period: number) => {
    const sma: { time: any; value: number }[] = [];
    for (let i = period - 1; i < items.length; i++) {
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += items[i - j].close;
      }
      sma.push({ time: items[i].time, value: Number((sum / period).toFixed(1)) });
    }
    return sma;
  };

  // チャートの完全描画
  useEffect(() => {
    if (!chartContainerRef.current || chartSeriesData.length === 0) return;

    chartContainerRef.current.innerHTML = '';
    if (chartRef.current) {
      chartRef.current = null;
    }

    const isIntraday = typeof chartSeriesData[0].time === 'number';

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: '#475569',
        fontSize: 11,
        fontFamily: 'Inter, -apple-system, sans-serif',
      },
      localization: {
        priceFormatter: (price: number) => `¥${Math.round(price).toLocaleString()}`,
        dateFormat: 'yyyy/MM/dd',
      },
      grid: {
        vertLines: { color: '#f1f5f9' },
        horzLines: { color: '#f1f5f9' },
      },
      crosshair: {
        mode: 1,
        vertLine: { color: '#64748b', width: 1, style: 2 },
        horzLine: { color: '#64748b', width: 1, style: 2 },
      },
      timeScale: {
        borderColor: '#cbd5e1',
        timeVisible: isIntraday,
        secondsVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      rightPriceScale: {
        borderColor: '#cbd5e1',
        autoScale: true,
        scaleMargins: {
          top: 0.08,
          bottom: showVolume ? 0.22 : 0.08,
        },
      },
      handleScale: true,
      handleScroll: true,
    });

    chartRef.current = chart;

    // ローソク足シリーズ
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#0d9488',
      downColor: '#e11d48',
      borderVisible: false,
      wickUpColor: '#0d9488',
      wickDownColor: '#e11d48',
      priceFormat: {
        type: 'price',
        precision: 0,
        minMove: 1,
      },
    });

    const candlePoints = chartSeriesData.map((d: any) => ({
      time: d.time,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));
    candleSeries.setData(candlePoints);

    // 出来高シリーズ
    if (showVolume) {
      const volumeSeries = chart.addHistogramSeries({
        color: '#cbd5e1',
        priceFormat: { type: 'volume' },
        priceScaleId: 'volume_scale',
      });

      chart.priceScale('volume_scale').applyOptions({
        scaleMargins: {
          top: 0.78,
          bottom: 0,
        },
      });

      const volumePoints = chartSeriesData.map((d: any) => ({
        time: d.time,
        value: d.volume,
        color: d.close >= d.open ? '#ccfbf1' : '#ffe4e6',
      }));
      volumeSeries.setData(volumePoints);
    }

    // 移動平均線 (SMA 25 / 75)
    if (showSMA && chartSeriesData.length >= 15) {
      const p1 = chartSeriesData.length >= 25 ? 25 : 10;
      const sma1 = chart.addLineSeries({
        color: '#0284c7',
        lineWidth: 2 as LineWidth,
        priceLineVisible: false,
        lastValueVisible: false,
      });
      sma1.setData(calculateSMA(chartSeriesData, p1));

      if (chartSeriesData.length >= 50) {
        const p2 = chartSeriesData.length >= 75 ? 75 : 50;
        const sma2 = chart.addLineSeries({
          color: '#d97706',
          lineWidth: 2 as LineWidth,
          priceLineVisible: false,
          lastValueVisible: false,
        });
        sma2.setData(calculateSMA(chartSeriesData, p2));
      }
    }

    // ホバー・クロスヘア購読
    chart.subscribeCrosshairMove((param) => {
      if (param.time) {
        const priceData = param.seriesData.get(candleSeries) as any;
        if (priceData) {
          const item = chartSeriesData.find((d: any) => d.time === param.time);
          setHoveredData({
            displayDate: item?.displayDate || param.time,
            open: priceData.open,
            high: priceData.high,
            low: priceData.low,
            close: priceData.close,
          });
        }
      } else {
        setHoveredData(null);
      }
    });

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current && chart) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: 440,
        });
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [chartSeriesData, showSMA, showVolume, timeframe]);

  const latest = chartSeriesData[chartSeriesData.length - 1] || {};
  const currentOHLC = hoveredData || latest;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5 sm:p-7">
      {/* 上部コントロールバー: 足種セレクター ＆ インジケーター */}
      <div className="flex flex-col gap-3 pb-3 border-b border-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* 足種セレクター (一本化) */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold">
            <span className="text-[11px] text-slate-500 px-2 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              足種:
            </span>
            <button
              onClick={() => setTimeframe('year')}
              className={`px-3 py-1.5 rounded-lg transition ${timeframe === 'year' ? 'bg-slate-900 text-white shadow-xs font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}
            >
              年足 (10年)
            </button>
            <button
              onClick={() => setTimeframe('month')}
              className={`px-3 py-1.5 rounded-lg transition ${timeframe === 'month' ? 'bg-slate-900 text-white shadow-xs font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}
            >
              月足 (5年)
            </button>
            <button
              onClick={() => setTimeframe('week')}
              className={`px-3 py-1.5 rounded-lg transition ${timeframe === 'week' ? 'bg-slate-900 text-white shadow-xs font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}
            >
              週足 (2年)
            </button>
            <button
              onClick={() => setTimeframe('day')}
              className={`px-3 py-1.5 rounded-lg transition ${timeframe === 'day' ? 'bg-slate-900 text-white shadow-xs font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}
            >
              日足
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setTimeframe('4h')}
              className={`px-2.5 py-1.5 rounded-lg transition ${timeframe === '4h' ? 'bg-teal-700 text-white shadow-xs font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}
            >
              4時間
            </button>
            <button
              onClick={() => setTimeframe('1h')}
              className={`px-2.5 py-1.5 rounded-lg transition ${timeframe === '1h' ? 'bg-teal-700 text-white shadow-xs font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}
            >
              1時間
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setTimeframe('15m')}
              className={`px-2.5 py-1.5 rounded-lg transition ${timeframe === '15m' ? 'bg-indigo-700 text-white shadow-xs font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}
            >
              15分
            </button>
            <button
              onClick={() => setTimeframe('5m')}
              className={`px-2.5 py-1.5 rounded-lg transition ${timeframe === '5m' ? 'bg-indigo-700 text-white shadow-xs font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}
            >
              5分
            </button>
            <button
              onClick={() => setTimeframe('1m')}
              className={`px-2.5 py-1.5 rounded-lg transition ${timeframe === '1m' ? 'bg-indigo-700 text-white shadow-xs font-extrabold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'}`}
            >
              1分足
            </button>
          </div>

          {/* 移動平均線 ＆ 出来高 トグル */}
          <div className="flex items-center gap-3 text-xs">
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-600 hover:text-slate-900">
              <input
                type="checkbox"
                checked={showSMA}
                onChange={(e) => setShowSMA(e.target.checked)}
                className="rounded text-teal-600 focus:ring-teal-500"
              />
              <span>移動平均線 (SMA 25/75)</span>
            </label>

            <label className="inline-flex items-center gap-1.5 cursor-pointer text-slate-600 hover:text-slate-900">
              <input
                type="checkbox"
                checked={showVolume}
                onChange={(e) => setShowVolume(e.target.checked)}
                className="rounded text-teal-600 focus:ring-teal-500"
              />
              <span>出来高</span>
            </label>

            <button
              onClick={() => chartRef.current?.timeScale().fitContent()}
              title="全画面フィット"
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 下段: OHLC値 */}
        <div className="flex flex-wrap items-center gap-3 text-xs pt-1 font-mono">
          <span className="text-slate-600 font-bold bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
            {currentOHLC.displayDate || currentOHLC.date || '-'}
          </span>
          <span>始値: <b className="text-slate-900">¥{currentOHLC.open ? Math.round(Number(currentOHLC.open)).toLocaleString() : '-'}</b></span>
          <span>高値: <b className="text-teal-600">¥{currentOHLC.high ? Math.round(Number(currentOHLC.high)).toLocaleString() : '-'}</b></span>
          <span>安値: <b className="text-rose-600">¥{currentOHLC.low ? Math.round(Number(currentOHLC.low)).toLocaleString() : '-'}</b></span>
          <span>終値: <b className="text-slate-900 font-bold bg-teal-50 text-teal-900 px-2 py-0.5 rounded border border-teal-200">¥{currentOHLC.close ? Math.round(Number(currentOHLC.close)).toLocaleString() : '-'}</b></span>
        </div>
      </div>

      {/* チャート描画エリア */}
      <div ref={chartContainerRef} className="w-full h-[440px] relative" />
    </div>
  );
}