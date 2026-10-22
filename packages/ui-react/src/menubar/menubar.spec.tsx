import { describe, it, expect } from 'vitest'; import { render, fireEvent } from '@testing-library/react';
import { Menubar } from './menubar';
const items = [{label:'File',value:'file',children:[{label:'New',value:'new'},{label:'Open',value:'open'}]},{label:'Edit',value:'edit',disabled:true,children:[{label:'Cut',value:'cut'}]}];
describe('Menubar',()=>{
  it('renders top-level items',()=>{const{container}=render(<Menubar items={items}/>);expect(container.textContent).toContain('File');expect(container.textContent).toContain('Edit');});
  it('opens submenu on click',()=>{const{container}=render(<Menubar items={items}/>);fireEvent.click(container.querySelector('[data-brkta-menubar-trigger]')!);expect(container.textContent).toContain('New');expect(container.textContent).toContain('Open');});
  it('renders disabled top-level item',()=>{const{container}=render(<Menubar items={items}/>);expect(container.querySelectorAll('[data-disabled]').length).toBeGreaterThan(0);});
  it('has menubar role',()=>{const{container}=render(<Menubar items={items}/>);expect(container.querySelector('[role="menubar"]')).toBeTruthy();});
});
