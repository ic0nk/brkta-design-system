import { Component, TemplateRef, ViewChild } from '@angular/core'; import { ComponentFixture, TestBed } from '@angular/core/testing'; import { TabsComponent } from './tabs.component';
const items = [{ label: 'Tab 1', value: 't1', content: 'Panel 1' }, { label: 'Tab 2', value: 't2', content: 'Panel 2' }, { label: 'Tab 3', value: 't3', content: 'Panel 3', disabled: true }];
describe('TabsComponent', () => {
  let c: TabsComponent; let f: ComponentFixture<TabsComponent>;
  beforeEach(async () => { await TestBed.configureTestingModule({ imports: [TabsComponent] }).compileComponents(); f = TestBed.createComponent(TabsComponent); c = f.componentInstance; f.componentRef.setInput('items', items); f.detectChanges(); });
  it('should create', () => expect(c).toBeTruthy());
  it('should render triggers', () => { expect(f.nativeElement.querySelectorAll('[role="tab"]').length).toBe(3); });
  it('should show first panel', () => { expect(f.nativeElement.querySelector('[role="tabpanel"]')?.textContent).toContain('Panel 1'); });
  it('should switch on click', () => { (f.nativeElement.querySelectorAll('[role="tab"]')[1] as HTMLElement).click(); f.detectChanges(); expect(f.nativeElement.querySelector('[role="tabpanel"]')?.textContent).toContain('Panel 2'); });
  it('should have role tablist', () => { expect(f.nativeElement.querySelector('[role="tablist"]')).toBeTruthy(); });
  it('should render segmented variant', () => { f.componentRef.setInput('variant', 'segmented'); f.detectChanges(); expect(f.nativeElement.querySelector('[data-variant="segmented"]')).toBeTruthy(); });
  it('should render vertical orientation', () => { f.componentRef.setInput('orientation', 'vertical'); f.detectChanges(); expect(f.nativeElement.querySelector('[data-orientation="vertical"]')).toBeTruthy(); });
});

@Component({
  standalone: true,
  imports: [TabsComponent],
  template: `
    <ng-template #richPanel><strong data-rich-panel>Rich panel</strong></ng-template>
    <brkta-tabs [items]="[{ label: 'Rich', value: 'rich', content: richPanel }]" />
  `,
})
class TemplatePanelHost {
  @ViewChild('richPanel', { static: true }) richPanel!: TemplateRef<unknown>;
}

describe('TabsComponent panel content', () => {
  it('renders a string panel inside the tabpanel', () => {
    const fixture = TestBed.createComponent(TabsComponent);
    fixture.componentRef.setInput('items', [{ label: 'String', value: 'string', content: 'String panel' }]);
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('[data-brkta-tabs-panel]');
    expect(panel.getAttribute('role')).toBe('tabpanel');
    expect(panel.textContent).toContain('String panel');
  });

  it('renders a TemplateRef panel inside the tabpanel', () => {
    const fixture = TestBed.createComponent(TemplatePanelHost);
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('[data-brkta-tabs-panel]');
    expect(panel.getAttribute('role')).toBe('tabpanel');
    expect(panel.querySelector('[data-rich-panel]')?.textContent).toContain('Rich panel');
  });
});
