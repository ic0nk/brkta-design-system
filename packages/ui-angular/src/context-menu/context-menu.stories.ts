import type { Meta, StoryObj } from '@storybook/angular';import { ContextMenuComponent } from './context-menu.component';
const meta:Meta<ContextMenuComponent>={title:'Components/ContextMenu',component:ContextMenuComponent,tags:['autodocs']};export default meta;type Story=StoryObj<ContextMenuComponent>;
export const Default:Story={args:{items:[{label:'Edit',value:'edit',shortcut:'⌘E'},{label:'Duplicate',value:'duplicate',shortcut:'⌘D'},{type:'separator'},{label:'Delete',value:'delete',destructive:true},{label:'Archive',value:'archive',disabled:true}]}};
