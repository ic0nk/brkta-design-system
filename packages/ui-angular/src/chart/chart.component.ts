import { Component, Input } from '@angular/core';

@Component({ selector: 'brkta-chart', standalone: true,
  template: `
    <div data-brkta-chart="">
      @if (title) { <div data-brkta-chart-title="">{{title}}</div> }
      @if (description) { <div data-brkta-chart-description="">{{description}}</div> }
      @if (type==='bar') {
        <div data-brkta-chart-bars="" [style.height.px]="height">
          @for (d of numericData; track d.label) {
            <div data-brkta-chart-bar="">
              @if (showValues) { <div data-brkta-chart-bar-value="">{{d.value}}</div> }
              <div data-brkta-chart-bar-fill="" [style.height.%]="(d.value/maxVal)*100" [style.background-color]="d.color||null"></div>
              <div data-brkta-chart-bar-label="">{{d.label}}</div>
            </div>
          }
        </div>
      }
      @if (type==='donut') {
        <div data-brkta-chart-donut="">
          <div data-brkta-chart-donut-ring=""><div data-brkta-chart-donut-center="">{{ totalValue }}</div></div>
          <div data-brkta-chart-legend="">
            @for (d of data; track d.label; let i=$index) {
              <div data-brkta-chart-legend-item=""><div data-brkta-chart-legend-dot="" [style.background-color]="d.color||null"></div>{{ d.label }}: {{ d.value }}</div>
            }
          </div>
        </div>
      }
      @if (type==='metric') {
        <div data-brkta-chart-metric="">
          @for (d of data; track d.label) {
            <div data-brkta-chart-metric-card=""><div data-brkta-chart-metric-value="">{{d.value}}</div><div data-brkta-chart-metric-label="">{{d.label}}</div></div>
          }
        </div>
      }
    </div>`,
})
export class ChartComponent {
  @Input() type: 'bar'|'donut'|'metric' = 'bar';
  @Input() title?: string;
  @Input() description?: string;
  @Input() data: {label:string;value:number|string;color?:string}[] = [];
  @Input() height = 200;
  @Input() showValues = false;
  get numericData() { return this.data.filter(d => typeof d.value === 'number') as {label:string;value:number;color?:string}[]; }
  get maxVal() { return Math.max(...this.numericData.map(d=>d.value),1); }
  get totalValue() { return this.numericData.reduce((s,d)=>s+d.value,0); }
}
