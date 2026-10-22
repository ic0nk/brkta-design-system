import type { Meta, StoryObj } from '@storybook/react'; import { Command } from './command';
const meta={title:'Components/Command',component:Command,tags:['autodocs']} as Meta;export default meta;type Story=StoryObj<typeof Command>;
const items=[{value:'new',label:'New File',shortcut:'⌘N'},{value:'open',label:'Open File...',shortcut:'⌘O'},{value:'save',label:'Save',shortcut:'⌘S',disabled:true},{value:'export',label:'Export as PDF',shortcut:'⇧⌘E'}];
export const Default:Story={args:{items}};
export const Empty:Story={args:{items:[],emptyText:'No commands available'}};
