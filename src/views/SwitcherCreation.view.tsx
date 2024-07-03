import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useAlertMessage } from '../hooks';
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
  const groups = useAppSelector(selectAllGroups);

  const { triggerAlert } = useAlertMessage();

  const getRandomSwitcherKey = () => Math.random().toString(36).slice(2);

  const dispatch = useAppDispatch();

  const handleAddSwitcher = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const switcherKey: string = formData.get('switcherKey') as string;
    const switcherName: string = formData.get('switcherName') as string;
    const groupName: string = formData.get('groupName') as string;
    const switcherLength: string =
      (formData.get('switcherLength') as string) || '15';

    if (groupName === '') return;

    const switcherLengthComputed = Math.max(parseInt(switcherLength, 10), 0);

    dispatch(
      addSwitcher({
        key: switcherKey,
        name: switcherName,
        groupName,
        length: switcherLengthComputed,
      }),
    );
    triggerAlert('Switcher has been created');

    onHide();
  };

  return (
    <Dialog open={visible} onClose={onHide}>
      <Box component="form" onSubmit={handleAddSwitcher}>
        <DialogTitle>Add Switcher</DialogTitle>
        <DialogContent>
          <Box display={'flex'} flexDirection={'column'} gap={2} pt={1}>
            <TextField
              label="Name"
              name="switcherName"
              size="small"
              fullWidth
            />
            <TextField
              label="Key"
              name="switcherKey"
              defaultValue={getRandomSwitcherKey()}
              size="small"
              fullWidth
            />
            <Select
              name="groupName"
              size="small"
              defaultValue=""
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
              name="switcherLength"
              defaultValue="15"
              size="small"
              type="number"
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onHide} color="error">
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
