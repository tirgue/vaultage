import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { Switcher } from '../../types';
import { Switcher as SwitcherComponent } from '../Switcher';
import { TrashButton } from '../TrashButton';

export type SwitchersProp = Array<Switcher & { generatedPassword: string }>;

export type GroupProps = {
  name: string;
  switchers: SwitchersProp;
  onDeleteSwitcher: (switchKey: string) => void;
  onEditSwitcher: (switchKey: string) => void;
  onDeleteGroup: (groupName: string) => void;
  filter?: string;
  onCopy?: () => void;
};

export const Group = ({
  name,
  switchers,
  onDeleteSwitcher,
  onEditSwitcher,
  onDeleteGroup,
  filter = '',
  onCopy,
}: GroupProps) => {
  const [open, setOpen] = useState(false);

  const filteredSwitchers = useMemo(
    () =>
      switchers.filter(({ name }) =>
        name.toUpperCase().includes(filter.toUpperCase()),
      ),
    [filter, switchers],
  );

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
        <TrashButton onDelete={() => onDeleteGroup(name)} />
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
          {filteredSwitchers.map((switcher) => (
            <SwitcherComponent
              {...switcher}
              key={switcher.key}
              switcherKey={switcher.key}
              onDeleteSwitcher={onDeleteSwitcher}
              onEditSwitcher={onEditSwitcher}
              onCopy={onCopy}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};
