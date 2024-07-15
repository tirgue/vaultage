import type { Meta, StoryObj } from '@storybook/react';
import { TrashButton } from './TrashButton';

const meta: Meta<typeof TrashButton> = {
  component: TrashButton,
};

export default meta;
type Story = StoryObj<typeof TrashButton>;

export const Default: Story = {
  args: {},
  parameters: {
    layout: 'centered',
  },
};
