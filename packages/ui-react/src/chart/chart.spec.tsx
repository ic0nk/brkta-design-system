import { describe, it, expect } from 'vitest'; import { render } from '@testing-library/react';
import { Chart } from './chart';
describe('Chart',()=>{
  it('renders title',()=>{const{container}=render(<Chart title="Revenue" data={[{label:'Jan',value:100}]} />);expect(container.textContent).toContain('Revenue');});
  it('renders bar chart',()=>{const{container}=render(<Chart data={[{label:'A',value:50},{label:'B',value:80}]} />);expect(container.querySelector('[data-brkta-chart-bar]')).toBeTruthy();});
  it('renders accessible description',()=>{const{container}=render(<Chart title="Sales" description="Monthly sales data" data={[{label:'Jan',value:100}]} />);expect(container.textContent).toContain('Monthly sales data');});
  it('renders metric cards',()=>{const{container}=render(<Chart type="metric" data={[{label:'Total',value:1000}]} />);expect(container.querySelector('[data-brkta-chart-metric]')).toBeTruthy();});
  it('renders donut chart',()=>{const{container}=render(<Chart type="donut" data={[{label:'A',value:60},{label:'B',value:40}]} />);expect(container.querySelector('[data-brkta-chart-donut]')).toBeTruthy();});
});
