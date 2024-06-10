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
import { useMemo, useState } from 'react';
import { Switcher } from '../../types';
import { PasswordViewer } from '../PasswordViewer';

export type SwitchersProp = Array<Switcher & { generatedPassword: string }>;

export type GroupProps = {
  name: string;
  switchers: SwitchersProp;
  onDeleteSwitcher: (switchKey: string) => void;
  onDeleteGroup: (groupName: string) => void;
  filter?: string;
};

export const Group = ({
  name,
  switchers,
  onDeleteSwitcher,
  onDeleteGroup,
  filter = '',
}: GroupProps) => {
  const [open, setOpen] = useState(false);

  const filteredSwitchers = useMemo(
    () =>
      switchers.filter(({ name }) =>
        name.toUpperCase().includes(filter.toUpperCase()),
      ),
    [filter, switchers],
  );

  const handleDeleteGroup = (name: string) => {
    onDeleteGroup(name);
  };

  const handleDeleteSwitcher = (id: string) => {
    onDeleteSwitcher(id);
  };

  return (
    <>
      <ListItemButton
        onClick={() => setOpen((open) => !open)}
        sx={{ gap: 1 }}
        disableRipple
      >
        <ListItemText
          primary={
            <Box display={'flex'} gap={1} alignItems={'center'}>
              <Typography>{name}</Typography>
              {filter ? (
                <Typography fontStyle="italic" variant="body2">
                  ({filteredSwitchers.length})
                </Typography>
              ) : null}
            </Box>
          }
        />
        <IconButton onClick={() => handleDeleteGroup(name)}>
          <Delete />
        </IconButton>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open}>
        <List>
          {filteredSwitchers.length === 0 ? (
            <ListItem component={Box} gap={3}>
              <Typography variant="overline" fontStyle="italic">
                {switchers.length === 0
                  ? 'Empty'
                  : 'No switchers matching filter'}
              </Typography>
            </ListItem>
          ) : null}
          {filteredSwitchers.map(({ key, length, name, generatedPassword }) => (
            <ListItem key={key} component={Box} flexDirection={'column'}>
              <Box display={'flex'} alignItems={'center'} width="100%">
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
                      sx={{
                        fontStyle: 'italic',
                        fontFamily: 'Ubuntu Sans Mono',
                      }}
                    >
                      {key} - {length}
                    </Typography>
                  }
                  sx={{ minWidth: 'initial' }}
                />
                <Box>
                  <IconButton onClick={() => handleDeleteSwitcher(key)}>
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
              <PasswordViewer generatedPassword={generatedPassword} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </>
  );
};
