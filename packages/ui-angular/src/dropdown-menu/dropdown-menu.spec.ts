import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownMenuComponent } from './dropdown-menu.component';
import type { DropdownMenuEntry } from '@brkta/ui-core/dropdown-menu/dropdown-menu-contract';

const sampleItems: DropdownMenuEntry[] = [
  { label: 'Edit', value: 'edit', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>' },
  { label: 'Duplicate', value: 'duplicate', shortcut: '⌘D' },
  { type: 'separator' },
  { label: 'Delete', value: 'delete', destructive: true },
  { label: 'Archive', value: 'archive', disabled: true },
];

describe('DropdownMenuComponent', () => {
  let component: DropdownMenuComponent;
  let fixture: ComponentFixture<DropdownMenuComponent>;

  function open(): void {
    const trigger = fixture.nativeElement.querySelector('[data-brkta-dropdown-menu-trigger]');
    trigger.click();
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DropdownMenuComponent] }).compileComponents();
    fixture = TestBed.createComponent(DropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', sampleItems);
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());
  it('should render trigger', () => expect(fixture.nativeElement.querySelector('[data-brkta-dropdown-menu-trigger]')).toBeTruthy());

  it('should support an accessible icon-only trigger', () => {
    fixture.componentRef.setInput('iconOnly', true);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('[data-brkta-dropdown-menu-trigger]');
    expect(trigger.hasAttribute('data-icon-only')).toBe(true);
    expect(trigger.getAttribute('aria-label')).toBe('Menu ▾');
    expect(trigger.querySelector('[data-brkta-dropdown-menu-trigger-icon]')).toBeTruthy();
    expect(trigger.textContent?.trim()).toBe('');
  });

  it('should render a bare icon trigger without the default chrome', () => {
    fixture.componentRef.setInput('iconOnly', true);
    fixture.componentRef.setInput('bareIconTrigger', true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-brkta-dropdown-menu-trigger]').hasAttribute('data-bare-icon-trigger')).toBe(true);
  });

  it('should open on trigger click', () => {
    open();
    expect(component.open).toBe(true);
    expect(fixture.nativeElement.querySelector('[data-brkta-dropdown-menu-content]')).toBeTruthy();
  });

  it('should set aria-expanded on trigger', () => {
    const trigger = fixture.nativeElement.querySelector('[data-brkta-dropdown-menu-trigger]');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    open();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.nativeElement.querySelector('[data-brkta-dropdown-menu]').getAttribute('data-open')).toBe('true');
  });

  it('should expose the requested menu placement on the wrapper', () => {
    fixture.componentRef.setInput('placement', 'top');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-brkta-dropdown-menu]').getAttribute('data-placement')).toBe('top');
  });

  it('should expose end alignment on the wrapper', () => {
    fixture.componentRef.setInput('align', 'end');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-brkta-dropdown-menu]').getAttribute('data-align')).toBe('end');
  });

  it('should emit when the menu opens', () => {
    let emitted: boolean | undefined;
    component.openChange.subscribe((open) => { emitted = open; });
    open();
    expect(emitted).toBe(true);
  });

  it('should render menu items when open', () => {
    open();
    const items = fixture.nativeElement.querySelectorAll('[data-brkta-dropdown-menu-item]');
    expect(items.length).toBe(4);
  });

  it('should render separator', () => {
    open();
    expect(fixture.nativeElement.querySelector('[role="separator"]')).toBeTruthy();
  });

  it('should mark destructive item', () => {
    open();
    const allItems = fixture.nativeElement.querySelectorAll('[data-brkta-dropdown-menu-item]');
    const deleteItem = Array.from(allItems).find((el: any) => el.textContent.includes('Delete'));
    expect(deleteItem).toBeTruthy();
    expect((deleteItem as HTMLElement).hasAttribute('data-destructive')).toBe(true);
  });

  it('should render a governed icon for icon-bearing items', () => {
    fixture.componentRef.setInput('items', [{ label: 'Delete', value: 'delete', icon: 'trash' }]);
    open();
    expect(fixture.nativeElement.querySelector('[data-brkta-dropdown-menu-item-icon] brkta-animated-trash')).toBeTruthy();
  });

  it('should mark disabled item', () => {
    open();
    const allItems = fixture.nativeElement.querySelectorAll('[data-brkta-dropdown-menu-item]');
    const archive = allItems[3] as HTMLElement;
    expect(archive.hasAttribute('data-disabled')).toBe(true);
  });

  it('should not select disabled item', () => {
    open();
    const allItems = fixture.nativeElement.querySelectorAll('[data-brkta-dropdown-menu-item]');
    (allItems[3] as HTMLElement).click();
    fixture.detectChanges();
    expect(component.open).toBe(true);
  });

  it('should emit itemSelect on item click', () => {
    let emitted = '';
    component.itemSelect.subscribe(v => emitted = v);
    open();
    const allItems = fixture.nativeElement.querySelectorAll('[data-brkta-dropdown-menu-item]');
    (allItems[0] as HTMLElement).click();
    fixture.detectChanges();
    expect(emitted).toBe('edit');
  });

  it('should set role="menu" on content', () => {
    open();
    expect(fixture.nativeElement.querySelector('[role="menu"]')).toBeTruthy();
  });

  it('should set role="menuitem" on items', () => {
    open();
    const allItems = fixture.nativeElement.querySelectorAll('[role="menuitem"]');
    expect(allItems.length).toBe(4);
  });
});
