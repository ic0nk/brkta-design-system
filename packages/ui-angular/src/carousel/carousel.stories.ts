import type { Meta, StoryObj } from '@storybook/angular';
import { CarouselComponent } from './carousel.component';

const meta: Meta<CarouselComponent> = { title: 'Wave 7C/Carousel', component: CarouselComponent, tags: ['autodocs'] };
export default meta; type Story = StoryObj<CarouselComponent>;

export const Default: Story = {
  render: () => ({
    template: `<brkta-carousel><div data-brkta-carousel-slide class="flex items-center justify-center h-48 bg-muted rounded">Dashboard</div><div data-brkta-carousel-slide class="flex items-center justify-center h-48 bg-muted rounded">Sales Q3</div><div data-brkta-carousel-slide class="flex items-center justify-center h-48 bg-muted rounded">Activity</div></brkta-carousel>`,
  }),
};
