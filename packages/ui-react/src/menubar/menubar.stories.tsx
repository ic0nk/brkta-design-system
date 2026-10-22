import type { Meta, StoryObj } from '@storybook/react'; import { Menubar } from './menubar';
const meta={title:'Components/Menubar',component:Menubar,tags:['autodocs']} as Meta;export default meta;type Story=StoryObj<typeof Menubar>;
const items=[{label:'File',value:'file',children:[{label:'New',value:'new'},{label:'Open',value:'open'},{type:'separator'},{label:'Save',value:'save',disabled:true},{label:'Export',value:'export'}]},{label:'Edit',value:'edit',children:[{label:'Undo',value:'undo'},{label:'Redo',value:'redo'}]},{label:'Help',value:'help',disabled:true}];
export const Default:Story={args:{items}};
