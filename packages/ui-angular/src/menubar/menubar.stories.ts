import type { Meta, StoryObj } from '@storybook/angular';import { MenubarComponent } from './menubar.component';
const meta:Meta<MenubarComponent>={title:'Components/Menubar',component:MenubarComponent,tags:['autodocs']};export default meta;type Story=StoryObj<MenubarComponent>;
export const Default:Story={args:{items:[{label:'File',value:'file',children:[{label:'New',value:'new'},{label:'Open',value:'open'},{label:'Save',value:'save',disabled:true}]},{label:'Edit',value:'edit',children:[{label:'Undo',value:'undo'},{label:'Redo',value:'redo'}]},{label:'Help',value:'help',disabled:true}]}};
