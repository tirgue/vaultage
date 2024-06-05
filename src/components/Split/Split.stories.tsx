import type { Meta, StoryObj } from '@storybook/react';

import { Box } from '@mui/material';
import { Split } from './Split';

const meta: Meta<typeof Split> = {
  component: Split,
};

export default meta;
type Story = StoryObj<typeof Split>;

export const Default: Story = {
  args: {
    children: [
      <Box
        key={1}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ height: 300 }}
      >
        Left
      </Box>,
      <Box
        key={2}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ height: 300 }}
      >
        Right
      </Box>,
    ],
  },
};
