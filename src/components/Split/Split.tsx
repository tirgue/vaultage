import { Box, Divider } from '@mui/material';
import { ReactNode } from 'react';

export type SplitProps = {
  children: [ReactNode, ReactNode];
};

export const Split = ({ children }: SplitProps) => {
  return (
    <Box display={'flex'} flexDirection={'row'}>
      <Box width={'100%'}>{children[0]}</Box>
      <Box
        display={'flex'}
        width={5}
        justifyContent={'center'}
        sx={{ cursor: 'col-resize' }}
      >
        <Divider orientation="vertical" flexItem />
      </Box>
      <Box width="100%">{children[1]}</Box>
    </Box>
  );
};
