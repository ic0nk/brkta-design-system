import type { Preview } from '@storybook/react';

import '@brkta/design-tokens/fonts.css';
import '@brkta/design-tokens/theme.css';
import '@brkta/design-tokens/base.css';
import '@brkta/design-tokens/glass.css';
import '@brkta/ui-core/styles/components.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'Light', value: '#F4F1EA' },
        { name: 'Dark', value: '#12110E' },
      ],
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      document.documentElement.classList.toggle('dark', theme === 'dark');
      return Story();
    },
  ],
};

export default preview;
