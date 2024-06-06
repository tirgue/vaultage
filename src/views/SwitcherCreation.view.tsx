import { Shuffle } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../state';
import { selectAllGroups } from '../state/groups.slice';
import { addSwitcher } from '../state/switchers.slice';

export type SwitcherCreationViewProps = {
  visible: boolean;
  onHide: () => void;
};

export const SwitcherCreationView = ({
  visible,
  onHide,
}: SwitcherCreationViewProps) => {
  const [switcherName, setSwitcherName] = useState('');
  const [switcherKey, setSwitcherKey] = useState('');
  const [switcherLength, setSwitcherLength] = useState(15);
  const [groupName, setGroupName] = useState('');

  const groups = useAppSelector(selectAllGroups);

  const handleRandomSwitcherKey = () => {
    setSwitcherKey(Math.random().toString(36).slice(2));
  };

  const dispatch = useAppDispatch();

  const handleAddSwitcher = () => {
    if (groupName === '') return;

    dispatch(
      addSwitcher({
        key: switcherKey,
        name: switcherName,
        groupName,
        length: switcherLength,
      }),
    );

    onHide();
  };

  return (
    <Dialog open={visible} onClose={onHide}>
      <DialogTitle>Create Switcher</DialogTitle>
      <DialogContent>
        <Box display={'flex'} flexDirection={'column'} gap={2} pt={1}>
          <TextField
            label="Name"
            value={switcherName}
            size="small"
            fullWidth
            onChange={(e) => setSwitcherName(e.target.value)}
          />
          <Box display={'flex'} gap={1} alignItems={'center'}>
            <TextField
              label="Key"
              value={switcherKey}
              size="small"
              fullWidth
              onChange={(e) => setSwitcherKey(e.target.value)}
            />
            <IconButton onClick={handleRandomSwitcherKey}>
              <Shuffle />
            </IconButton>
          </Box>
          <Select
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            size="small"
            displayEmpty
            fullWidth
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {groups.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Password Length"
            value={switcherLength}
            size="small"
            type="number"
            onChange={(e) =>
              setSwitcherLength(Math.max(parseInt(e.target.value, 10), 0))
            }
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onHide}>Cancel</Button>
        <Button onClick={handleAddSwitcher}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};
