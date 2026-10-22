import type { Meta, StoryObj } from '@storybook/react';
import { InputOTP } from './input-otp';

const meta = { title: 'Components/InputOTP', component: InputOTP, tags: ['autodocs'] } satisfies Meta<typeof InputOTP>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { length: 6 } };
export const FourDigits: Story = { args: { length: 4 } };
