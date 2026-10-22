import type { Meta, StoryObj } from '@storybook/angular';
import { InputOTPComponent } from './input-otp.component';

const meta: Meta<InputOTPComponent> = { title: 'Components/InputOTP', component: InputOTPComponent, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<InputOTPComponent>;

export const Default: Story = { args: { length: 6 } };
export const FourDigits: Story = { args: { length: 4 } };
