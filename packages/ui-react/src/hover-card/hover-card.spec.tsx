import { describe,it,expect } from 'vitest';import { render,screen } from '@testing-library/react';import { HoverCard } from './hover-card';
describe('HoverCard',()=>{it('renders trigger',()=>{render(<HoverCard trigger={<span>Info</span>}><div>Content</div></HoverCard>);expect(screen.getByText('Info')).toBeTruthy();});});
