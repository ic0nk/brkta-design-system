import type { Meta, StoryObj } from '@storybook/angular';import { CommandComponent } from './command.component';
const meta:Meta<CommandComponent>={title:'Components/Command',component:CommandComponent,tags:['autodocs']};export default meta;type Story=StoryObj<CommandComponent>;
export const Default:Story={args:{items:[{value:'new',label:'New File',shortcut:'⌘N'},{value:'open',label:'Open...',shortcut:'⌘O'},{value:'save',label:'Save',shortcut:'⌘S',disabled:true}]}};
export const Empty:Story={args:{items:[],emptyText:'No commands found'}};
