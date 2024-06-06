import { Delete, ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Switcher } from '../../types';
import { PasswordViewer } from '../PasswordViewer';

export type SwitchersProp = Array<Switcher & { generatedPassword: string }>;

export type GroupProps = {
  name: string;
  switchers: SwitchersProp;
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
        <List>
          {switchers.map(({ key, length, name, generatedPassword }) => (
            <ListItem key={key} component={Box} gap={3}>
              <ListItemText
                primary={
                  <Typography whiteSpace="nowrap" width="fit-content">
                    {name}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    whiteSpace="nowrap"
                    width="fit-content"
                  >
                    {key} - {length}
                  </Typography>
                }
                sx={{ minWidth: 'initial' }}
              />
              <PasswordViewer generatedPassword={generatedPassword} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};
