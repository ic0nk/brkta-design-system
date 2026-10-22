import type { Meta, StoryObj } from '@storybook/angular';
import { PasswordStrengthComponent } from './password-strength.component';

const meta: Meta<PasswordStrengthComponent> = { title: 'Components/Password Strength', component: PasswordStrengthComponent, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<PasswordStrengthComponent>;
export const Fair: Story = { args: { score: 2, label: 'Password strength', description: 'Fair' } };
export const Strong: Story = { args: { score: 4, label: 'Password strength', description: 'Strong' } };
