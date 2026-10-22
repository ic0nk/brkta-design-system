'use client';
import { useState, useCallback, useRef, useEffect } from 'react';
import type { CommandContract, CommandItem } from '@brkta/ui-core/command/command-contract';

export interface CommandProps extends CommandContract {}

export function Command({
  items = [], groups = [], placeholder = 'Type a command...', emptyText = 'No results.',
  onSelect, open: controlledOpen, onOpenChange,
}: CommandProps) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const inputRef = useRef<HTMLInputElement>(null);
  const setOpen = (o: boolean) => { setInternalOpen(o); onOpenChange?.(o); };

  const allItems: CommandItem[] = groups.length ? groups.flatMap(g => g.items) : items;
  const filtered = allItems.filter(i => i.label.toLowerCase().includes(q.toLowerCase()));

  const select = (v: string) => { onSelect?.(v); setOpen(false); setQ(''); };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey||e.metaKey) && e.key==='k') { e.preventDefault(); setOpen(!isOpen); }
      if (e.key === 'Escape' && isOpen) { setOpen(false); }
    };
    document.addEventListener('keydown', h); return () => document.removeEventListener('keydown', h);
  }, [isOpen]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key==='ArrowDown'){e.preventDefault();setActive(i=>Math.min(i+1,filtered.length-1));}
    else if (e.key==='ArrowUp'){e.preventDefault();setActive(i=>Math.max(i-1,0));}
    else if (e.key==='Enter'){e.preventDefault();if(filtered[active])select(filtered[active].value);}
    else if (e.key==='Escape'){setOpen(false);}
  };

  return (
    <div data-brkta-command="">
      <input ref={inputRef} data-brkta-command-input="" value={q}
        placeholder={placeholder} onChange={e=>{setQ(e.target.value);setActive(0);if(!isOpen)setOpen(true);}}
        onKeyDown={onKeyDown} onFocus={()=>setOpen(true)} />
      {isOpen && (
        <div data-brkta-command-list="" role="listbox">
          {filtered.length===0 ? <div data-brkta-command-empty="">{emptyText}</div> :
           filtered.map((it,i)=>(<div key={it.value} data-brkta-command-item="" data-active={i===active?'':undefined} data-disabled={it.disabled?'':undefined}
              onClick={()=>!it.disabled&&select(it.value)} role="option">
              <span>{it.label}</span>
              {it.shortcut && <span data-brkta-command-item-shortcut="">{it.shortcut}</span>}
            </div>))
          }
        </div>
      )}
    </div>
  );
}
