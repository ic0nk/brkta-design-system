import type { Preview } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'Auto',
      values: [
        { name: 'Auto', value: 'transparent' },
        { name: 'Light (cream)', value: '#F4F1EA' },
        { name: 'Dark (charcoal)', value: '#12110E' },
      ],
    },
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme — light or dark',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'circlehollow' },
          { value: 'dark', title: 'Dark', icon: 'circle' },
        ],
        showName: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals?.['theme'] || 'light';
      document.documentElement.classList.toggle('dark', theme === 'dark');
      return Story();
    },
  ],

  tags: ['autodocs']
};

export default preview;
