import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../state';
import { addGroup } from '../state/groups.slice';

export type GroupCreationViewProps = {
  visible: boolean;
  onHide: () => void;
};

export const GroupCreationView = ({
  onHide,
  visible,
}: GroupCreationViewProps) => {
  const [groupName, setGroupName] = useState('');

  const dispatch = useAppDispatch();

  const handleAddGroup = () => {
    if (groupName === '') return;

    dispatch(addGroup(groupName));

    onHide();
  };

  return (
    <Dialog open={visible} onClose={onHide}>
      <DialogTitle>Add Group</DialogTitle>
      <DialogContent>
        <Box display={'flex'} flexDirection={'column'} gap={2} pt={1}>
          <TextField
            label="Name"
            value={groupName}
            size="small"
            fullWidth
            onChange={(e) => setGroupName(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onHide}>Cancel</Button>
        <Button onClick={handleAddGroup}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};
