import type { Meta, StoryObj } from '@storybook/react'; import { ContextMenu } from './context-menu';
const meta={title:'Components/ContextMenu',component:ContextMenu,tags:['autodocs']} as Meta;export default meta;type Story=StoryObj<typeof ContextMenu>;
const items=[{label:'Edit',value:'edit',shortcut:'⌘E'},{label:'Duplicate',value:'duplicate',shortcut:'⌘D'},{type:'separator'},{label:'Delete',value:'delete',destructive:true,shortcut:'⌫'},{label:'Archive',value:'archive',disabled:true}];
export const Default:Story={args:{items,children:<button>Right-click me</button>}};
