'use client';
import type { ChartContract } from '@brkta/ui-core/chart/chart-contract';

export interface ChartProps extends ChartContract {}

export function Chart({ type = 'bar', title, description, data = [], height = 200, showValues }: ChartProps) {
  const numericData = data.filter(d => typeof d.value === 'number') as {label:string;value:number;color?:string}[];
  const maxVal = Math.max(...numericData.map(d => d.value), 1);
  return (
    <div data-brkta-chart="">
      {title && <div data-brkta-chart-title="">{title}</div>}
      {description && <div data-brkta-chart-description="">{description}</div>}
      {type === 'bar' && (
        <div data-brkta-chart-bars="" style={{ height }}>
          {numericData.map((d, i) => (
            <div key={i} data-brkta-chart-bar="">
              {showValues && <div data-brkta-chart-bar-value="">{d.value}</div>}
              <div data-brkta-chart-bar-fill="" style={{ height: `${(d.value/maxVal)*100}%`, backgroundColor: d.color }} />
              <div data-brkta-chart-bar-label="">{d.label}</div>
            </div>
          ))}
        </div>
      )}
      {type === 'donut' && (
        <div data-brkta-chart-donut="">
          <div data-brkta-chart-donut-ring="" style={{ background: `conic-gradient(${numericData.map((d,i) => { const prev = numericData.slice(0,i).reduce((s,x)=>s+(x.value/maxVal)*360,0); return `${d.color||'var(--primary)'} ${prev}deg ${prev+(d.value/maxVal)*360}deg` }).join(',')})` }}>
            <div data-brkta-chart-donut-center="">{numericData.reduce((s,d)=>s+d.value,0)}</div>
          </div>
          <div data-brkta-chart-legend="">
            {data.map((d,i) => <div key={i} data-brkta-chart-legend-item=""><div data-brkta-chart-legend-dot="" style={{background:d.color||'var(--primary)'}} />{d.label}: {d.value}</div>)}
          </div>
        </div>
      )}
      {type === 'metric' && (
        <div data-brkta-chart-metric="">
          {data.map((d,i) => <div key={i} data-brkta-chart-metric-card=""><div data-brkta-chart-metric-value="">{d.value}</div><div data-brkta-chart-metric-label="">{d.label}</div></div>)}
        </div>
      )}
    </div>
  );
}
