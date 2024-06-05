import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, Collapse, Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { Switcher } from '../../types';
import { Switcher as SwitcherComponent } from '../Switcher';

export type GroupProps = {
  name: string;
  switchers: Omit<Switcher, 'groupName'>[];
  onDeleteSwitch: (switchKey: string) => void;
  filter?: string;
};

export const Group = ({ name, switchers, onDeleteSwitch }: GroupProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Box display={'flex'} flexDirection={'column'} gap={1}>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography>{name}</Typography>
        <IconButton onClick={() => setOpen((open) => !open)}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={open}>
        <Grid container spacing={1}>
          {switchers.map((switcher) => (
            <Grid item key={switcher.key}>
              <SwitcherComponent
                onDeleteSwitch={onDeleteSwitch}
                {...switcher}
              />
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </Box>
  );
};
