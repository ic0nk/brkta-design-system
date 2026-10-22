import type { Meta, StoryObj } from '@storybook/react';
import { PasswordStrength } from './password-strength';

const meta = { title: 'Components/Password Strength', component: PasswordStrength, tags: ['autodocs'] } satisfies Meta<typeof PasswordStrength>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Fair: Story = { args: { score: 2, label: 'Password strength', description: 'Fair' } };
export const Strong: Story = { args: { score: 4, label: 'Password strength', description: 'Strong' } };
