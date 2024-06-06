import type { Meta, StoryObj } from '@storybook/react';
import { PasswordViewer } from './PasswordViewer';

const meta: Meta<typeof PasswordViewer> = {
  component: PasswordViewer,
};

export default meta;
type Story = StoryObj<typeof PasswordViewer>;

export const Default: Story = {
  args: {
    generatedPassword: 'password',
  },
};
