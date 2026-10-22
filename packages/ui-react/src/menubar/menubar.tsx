'use client';
import { useState } from 'react';
import type { MenubarContract } from '@brkta/ui-core/menubar/menubar-contract';

export interface MenubarProps extends MenubarContract {}

export function Menubar({ items, onSelect }: MenubarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div data-brkta-menubar="" role="menubar">
      {items.map(item => (
        <div key={item.value} style={{position:'relative'}}>
          <button data-brkta-menubar-trigger="" data-open={openMenu===item.value?'':undefined}
            data-disabled={item.disabled?'':undefined} disabled={item.disabled}
            onClick={()=>setOpenMenu(openMenu===item.value?null:item.value)}
            onBlur={()=>setTimeout(()=>setOpenMenu(null),200)}
            role="menuitem" aria-haspopup={item.children?'true':undefined}>
            {item.label}
          </button>
          {openMenu===item.value && item.children && (
            <div data-brkta-menubar-content="" role="menu">
              {item.children.map(c => (
                <div key={c.value} data-brkta-menubar-item="" data-disabled={c.disabled?'':undefined}
                  role="menuitem" onClick={()=>{onSelect?.(c.value);setOpenMenu(null);}}>
                  {c.label}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
