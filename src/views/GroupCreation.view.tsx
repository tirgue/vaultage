import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useAlertMessage } from '../hooks';
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
  const dispatch = useAppDispatch();

  const { triggerAlert } = useAlertMessage();

  const handleAddGroup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const groupName: string = formData.get('groupName') as string;

    if (groupName === '') return;

    dispatch(addGroup(groupName));
    triggerAlert('Group has been created');
    onHide();
  };

  return (
    <Dialog
      open={visible}
      onClose={onHide}
      PaperProps={{
        component: 'form',
        onSubmit: handleAddGroup,
      }}
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>Add Group</DialogTitle>
      <DialogContent>
        <Box display={'flex'} flexDirection={'column'} gap={2} pt={1}>
          <TextField label="Name" name="groupName" size="small" fullWidth />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onHide} color="error">
          Cancel
        </Button>
        <Button type="submit">Add</Button>
      </DialogActions>
    </Dialog>
  );
};
