import type { Meta, StoryObj } from '@storybook/react';
import { Group } from './Group';

const meta: Meta<typeof Group> = {
  component: Group,
};

export default meta;
type Story = StoryObj<typeof Group>;

export const Default: Story = {
  args: {
    name: 'Group Name',
    switchers: [
      {
        key: 'k1',
        length: 10,
        name: 'Name 1',
        groupName: '',
        generatedPassword: 'generatedForK1',
      },
      {
        key: 'k2',
        length: 20,
        name: 'Name 2',
        groupName: '',
        generatedPassword: 'generatedForK2',
      },
    ],
  },
};
