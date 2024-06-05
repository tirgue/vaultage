import { Delete, ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Collapse,
  Grid,
  IconButton,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { Switcher } from '../../types';
import { Switcher as SwitcherComponent } from '../Switcher';

export type GroupProps = {
  name: string;
  switchers: Omit<Switcher, 'groupName'>[];
  onDeleteSwitch: (switchKey: string) => void;
  onDeleteGroup: (groupName: string) => void;
  filter?: string;
};

export const Group = ({
  name,
  switchers,
  onDeleteSwitch,
  onDeleteGroup,
}: GroupProps) => {
  const [open, setOpen] = useState(false);

  const handleDeleteGroup: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onDeleteGroup(name);
  };

  return (
    <>
      <ListItemButton
        onClick={() => setOpen((open) => !open)}
        sx={{ gap: 1 }}
        disableRipple
      >
        <ListItemText primary={name} />
        <IconButton onClick={handleDeleteGroup}>
          <Delete />
        </IconButton>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>
        <Grid container spacing={1}>
          {switchers.map(({ key, length, name }) => (
            <Grid item key={key}>
              <SwitcherComponent
                onDeleteSwitch={onDeleteSwitch}
                switcherKey={key}
                name={name}
                length={length}
              />
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </>
  );
};
