import type { Meta, StoryObj } from '@storybook/angular';import { ChartComponent } from './chart.component';
const meta:Meta<ChartComponent>={title:'Components/Chart',component:ChartComponent,tags:['autodocs']};export default meta;type Story=StoryObj<ChartComponent>;
export const Bar:Story={args:{type:'bar',title:'Revenue',data:[{label:'Jan',value:120},{label:'Feb',value:200},{label:'Mar',value:150}],showValues:true}};
export const Metric:Story={args:{type:'metric',title:'Metrics',data:[{label:'Revenue',value:'$45K'},{label:'Users',value:'1,234'},{label:'Orders',value:'567'}]}};
