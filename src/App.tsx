import { ContentCopy } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useInjection } from './hooks';
import { PassGeneratorService } from './services';
import { addSwitcher } from './state/cabinet.slice';
import { useAppDispatch, useAppSelector } from './state/store';

function App() {
  const [masterPassword, setMasterPassword] = useState('');
  const [switcherName, setSwitcherName] = useState('');
  const [switcherKey, setSwitcherKey] = useState('');
  const [length, setLength] = useState(15);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const passGeneratorService = useInjection(PassGeneratorService);

  const cabinet = useAppSelector(({ cabinet }) => cabinet);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fn = async () => {
      const generatedPassword = await passGeneratorService.generatePassword(
        masterPassword,
        switcherKey,
        length
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
        length,
      })
    );
  };

  return (
    <Box sx={{ m: 3 }}>
      <Typography variant="h2" sx={{ mb: 5 }}>
        Vaultage Demo
      </Typography>
      <Divider sx={{ m: 2 }} textAlign="left">
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
      <Divider sx={{ m: 2 }} textAlign="left">
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
      <TextField
        label="Key"
        value={switcherKey}
        size="small"
        margin="dense"
        fullWidth
        onChange={(e) => setSwitcherKey(e.target.value)}
      />
      <Box display={'flex'} alignItems={'center'}>
        <TextField
          label="Password Length"
          value={length}
          sx={{ mr: 3 }}
          size="small"
          margin="dense"
          type="number"
          onChange={(e) => setLength(Math.max(parseInt(e.target.value, 10), 0))}
        />
        <Button variant="contained" onClick={handleAddSwitcher}>
          Add Switcher
        </Button>
      </Box>
      <Divider sx={{ m: 2 }} textAlign="left">
        <Chip label="Generated Password" size="small" />
      </Divider>
      <Box display={'flex'} alignItems={'center'}>
        <IconButton
          onClick={() => navigator.clipboard.writeText(generatedPassword)}
        >
          <ContentCopy />
        </IconButton>
        <TextField
          label="Generated Password"
          contentEditable="plaintext-only"
          size="small"
          margin="dense"
          fullWidth
          InputProps={{ readOnly: true }}
          value={generatedPassword}
        />
      </Box>
      <Divider sx={{ m: 2 }} textAlign="left">
        <Chip label="Saved Switchers" size="small" />
      </Divider>
      <Box display={'flex'} alignItems={'center'}>
        <List>
          {Object.values(cabinet).map(({ key, length, name }) => (
            <ListItem key={key}>
              {name} - {key} - {length}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default App;
