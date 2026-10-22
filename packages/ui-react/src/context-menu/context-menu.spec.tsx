import { describe, it, expect } from 'vitest'; import { render, fireEvent } from '@testing-library/react';
import { ContextMenu } from './context-menu';
const items = [{label:'Edit',value:'edit',shortcut:'⌘E'},{label:'Delete',value:'delete',destructive:true},{type:'separator'},{label:'Archive',value:'archive',disabled:true}];
describe('ContextMenu',()=>{
  it('renders trigger',()=>{const{container}=render(<ContextMenu items={items}><button>Right-click</button></ContextMenu>);expect(container.textContent).toContain('Right-click');});
  it('opens on context menu',()=>{const{container}=render(<ContextMenu items={items}><div>Trigger</div></ContextMenu>);fireEvent.contextMenu(container.querySelector('[data-brkta-context-menu]')!);expect(container.querySelector('[data-brkta-context-menu-list]')).toBeTruthy();});
  it('renders menu items',()=>{const{container}=render(<ContextMenu items={items}><div>T</div></ContextMenu>);fireEvent.contextMenu(container.querySelector('[data-brkta-context-menu]')!);expect(container.textContent).toContain('Edit');expect(container.textContent).toContain('Delete');});
  it('renders separator',()=>{const{container}=render(<ContextMenu items={items}><div>T</div></ContextMenu>);fireEvent.contextMenu(container.querySelector('[data-brkta-context-menu]')!);expect(container.querySelector('[data-brkta-context-menu-separator]')).toBeTruthy();});
});
