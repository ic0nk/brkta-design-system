import { describe, it, expect } from 'vitest'; import { render, fireEvent } from '@testing-library/react';
import { Command } from './command';
const items = [{value:'new',label:'New File',shortcut:'⌘N'},{value:'open',label:'Open File'},{value:'save',label:'Save',disabled:true}];
describe('Command',()=>{
  it('renders input',()=>{const{container}=render(<Command items={items}/>);expect(container.querySelector('[data-brkta-command-input]')).toBeTruthy();});
  it('shows list on focus',()=>{const{container}=render(<Command items={items}/>);fireEvent.focus(container.querySelector('[data-brkta-command-input]')!);expect(container.querySelector('[data-brkta-command-list]')).toBeTruthy();});
  it('filters items',()=>{const{container}=render(<Command items={items}/>);const input=container.querySelector('[data-brkta-command-input]')!;fireEvent.focus(input);fireEvent.change(input,{target:{value:'New'}});expect(container.textContent).toContain('New File');});
  it('shows empty state',()=>{const{container}=render(<Command items={items}/>);fireEvent.focus(container.querySelector('[data-brkta-command-input]')!);fireEvent.change(container.querySelector('[data-brkta-command-input]')!,{target:{value:'ZZZZZZ'}});expect(container.textContent).toContain('No results.');});
  it('supports keyboard nav',()=>{const{container}=render(<Command items={items}/>);fireEvent.focus(container.querySelector('[data-brkta-command-input]')!);fireEvent.keyDown(container.querySelector('[data-brkta-command-input]')!,{key:'ArrowDown'});expect(container.querySelector('[data-active]')).toBeTruthy();});
});
