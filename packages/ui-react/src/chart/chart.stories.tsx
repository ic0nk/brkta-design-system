import type { Meta, StoryObj } from '@storybook/react'; import { Chart } from './chart';
const meta={title:'Components/Chart',component:Chart,tags:['autodocs']} as Meta;export default meta;type Story=StoryObj<typeof Chart>;
const data=[{label:'Jan',value:120},{label:'Feb',value:200},{label:'Mar',value:150},{label:'Apr',value:280}];
export const Bar:Story={args:{type:'bar',title:'Monthly Revenue',data,showValues:true}};
export const MetricCards:Story={args:{type:'metric',title:'Key Metrics',data:[{label:'Revenue',value:'$45K'},{label:'Users',value:'1,234'},{label:'Orders',value:'567'}]}};
