import type { Meta, StoryObj } from '@storybook/react';

import { Switcher } from './Switcher';

const meta: Meta<typeof Switcher> = {
  component: Switcher,
};

export default meta;
type Story = StoryObj<typeof Switcher>;

export const Default: Story = {
  args: {
    length: 15,
    name: 'Switcher Name',
    key: 'switcher-key',
    masterPassword: 'masterPassword',
  },
};
