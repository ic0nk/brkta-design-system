'use client';
import { useState, useCallback, useEffect } from 'react';
import type { ContextMenuContract } from '@brkta/ui-core/context-menu/context-menu-contract';

export interface ContextMenuProps extends ContextMenuContract { children?: React.ReactNode; }

export function ContextMenu({ items, children }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onContext = useCallback((e: React.MouseEvent) => { e.preventDefault(); setPos({x:e.clientX,y:e.clientY}); setOpen(true); }, []);
  useEffect(() => { const h = () => setOpen(false); if(open) document.addEventListener('click',h); return ()=>document.removeEventListener('click',h); }, [open]);

  return (
    <div data-brkta-context-menu="" onContextMenu={onContext}>
      {children}
      {open && <div data-brkta-context-menu-list="" role="menu" style={{position:'fixed',left:pos.x,top:pos.y}}>
        {items.map((it,i) => 'type' in it && it.type==='separator' ? <div key={i} data-brkta-context-menu-separator="" role="separator" /> :
         <div key={'value' in it ? it.value : i} data-brkta-context-menu-item="" data-disabled={'disabled' in it && it.disabled?'':undefined} data-destructive={'destructive' in it && it.destructive?'':undefined}
           role="menuitem" onClick={()=>{if('value' in it){setOpen(false);}}}>
           <span>{'label' in it ? it.label : ''}</span>
           {'shortcut' in it && it.shortcut && <span data-brkta-context-menu-shortcut="">{it.shortcut}</span>}
         </div>)}
      </div>}
    </div>
  );
}
