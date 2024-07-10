import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useAlertMessage } from '../hooks';
import { useAppDispatch, useAppSelector } from '../state';
import { addSwitcher, editSwitcher, selectAllGroups } from '../state/slices';
import { Switcher } from '../types';

export type SwitcherCreationViewProps = {
  visible: boolean;
  onHide: () => void;
  defaultSwitcher?: Switcher;
};

export const SwitcherCreationView = ({
  visible,
  onHide,
  defaultSwitcher,
}: SwitcherCreationViewProps) => {
  const groups = useAppSelector(selectAllGroups);

  const dispatch = useAppDispatch();

  const { triggerAlert } = useAlertMessage();

  const getRandomSwitcherKey = () => Math.random().toString(36).slice(2);

  const handleAddSwitcher = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const switcherKey: string = formData.get('switcherKey') as string;
    const switcherName: string = formData.get('switcherName') as string;
    const groupName: string = formData.get('groupName') as string;
    const switcherLength: string =
      (formData.get('switcherLength') as string) || '15';

    if (!groupName || !switcherKey) return;

    const switcherLengthComputed = Math.max(parseInt(switcherLength, 10), 0);

    if (defaultSwitcher) {
      dispatch(
        editSwitcher({
          key: switcherKey,
          name: switcherName,
          groupName,
          length: switcherLengthComputed,
        }),
      );
      triggerAlert('Switcher has been created');
    } else {
      dispatch(
        addSwitcher({
          key: switcherKey,
          name: switcherName,
          groupName,
          length: switcherLengthComputed,
        }),
      );
      triggerAlert('Switcher has been edited');
    }

    onHide();
  };

  return (
    <Dialog
      open={visible}
      onClose={onHide}
      PaperProps={{
        component: 'form',
        onSubmit: handleAddSwitcher,
      }}
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>{defaultSwitcher ? 'Edit' : 'Add'} Switcher</DialogTitle>
      <DialogContent>
        <Box display={'flex'} flexDirection={'column'} gap={2} pt={1}>
          <TextField
            label="Name"
            name="switcherName"
            defaultValue={defaultSwitcher?.name ?? ''}
            size="small"
            fullWidth
          />
          <TextField
            label="Key"
            name="switcherKey"
            defaultValue={defaultSwitcher?.key ?? getRandomSwitcherKey()}
            size="small"
            fullWidth
            InputProps={{ readOnly: !!defaultSwitcher }}
          />
          <FormControl size="small" fullWidth>
            <InputLabel>Group</InputLabel>
            <Select
              label="Group"
              name="groupName"
              defaultValue={defaultSwitcher?.groupName ?? ''}
              size="small"
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
          </FormControl>
          <TextField
            label="Password Length"
            name="switcherLength"
            defaultValue={defaultSwitcher?.length ?? '15'}
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
        <Button type="submit">{defaultSwitcher ? 'Save' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  );
};
