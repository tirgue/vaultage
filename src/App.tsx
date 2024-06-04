import { ContentCopy, Shuffle } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Switcher } from './components';
import { useInjection } from './hooks';
import { PassGeneratorService } from './services';
import { useAppDispatch, useAppSelector } from './state/store';
import {
  addSwitcher,
  deleteSwitcher,
  selectAllSwitchers,
} from './state/switchers.slice';

function App() {
  const [masterPassword, setMasterPassword] = useState('');
  const [switcherName, setSwitcherName] = useState('');
  const [switcherKey, setSwitcherKey] = useState('');
  const [length, setLength] = useState(15);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const passGeneratorService = useInjection(PassGeneratorService);

  const switchers = useAppSelector(selectAllSwitchers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fn = async () => {
      const generatedPassword = await passGeneratorService.generatePassword(
        masterPassword,
        switcherKey,
        length,
      );
      setGeneratedPassword(generatedPassword);
    };
    fn();
  }, [length, passGeneratorService, masterPassword, switcherKey]);

  const handleAddSwitcher = () => {
    dispatch(
      addSwitcher({
        key: switcherKey,
        name: switcherName,
        groupName: 'group',
        length,
      }),
    );
  };

  const handleDeleteSwitcher = (switcherKey: string) => {
    dispatch(deleteSwitcher(switcherKey));
  };

  const handleRandomSwitcherKey = () => {
    setSwitcherKey(Math.random().toString(36).slice(2));
  };

  return (
    <Box sx={{ m: 3 }} display={'flex'} flexDirection={'column'} gap={1}>
      <Typography variant="h2" sx={{ mb: 5 }}>
        Vaultage Demo
      </Typography>
      <Divider textAlign="left">
        <Chip label="Master Password" size="small" />
      </Divider>
      <TextField
        label="Master Password"
        value={masterPassword}
        size="small"
        margin="dense"
        fullWidth
        onChange={(e) => setMasterPassword(e.target.value)}
      />
      <Divider textAlign="left">
        <Chip label="Switcher" size="small" />
      </Divider>
      <TextField
        label="Name"
        value={switcherName}
        size="small"
        margin="dense"
        fullWidth
        onChange={(e) => setSwitcherName(e.target.value)}
      />
      <Box display={'flex'} gap={1} alignItems={'center'}>
        <IconButton onClick={handleRandomSwitcherKey}>
          <Shuffle />
        </IconButton>
        <TextField
          label="Key"
          value={switcherKey}
          size="small"
          margin="dense"
          fullWidth
          onChange={(e) => setSwitcherKey(e.target.value)}
        />
      </Box>
      <Box display={'flex'} alignItems={'center'} gap={3}>
        <TextField
          label="Password Length"
          value={length}
          size="small"
          margin="dense"
          type="number"
          onChange={(e) => setLength(Math.max(parseInt(e.target.value, 10), 0))}
        />
        <Button variant="contained" onClick={handleAddSwitcher}>
          Add Switcher
        </Button>
      </Box>
      <Divider textAlign="left">
        <Chip label="Generated Password" size="small" />
      </Divider>
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <IconButton
          onClick={() => navigator.clipboard.writeText(generatedPassword)}
        >
          <ContentCopy />
        </IconButton>
        <TextField
          label="Generated Password"
          size="small"
          margin="dense"
          fullWidth
          InputProps={{ readOnly: true }}
          value={generatedPassword}
        />
      </Box>
      <Divider textAlign="left">
        <Chip label="Saved Switchers" size="small" />
      </Divider>
      <Grid container spacing={1}>
        {Object.values(switchers).map(({ key, length, name }) => (
          <Grid item key={key}>
            <Switcher
              length={length}
              name={name}
              switchKey={key}
              masterPassword={masterPassword}
              onDeleteSwitch={handleDeleteSwitcher}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;
