import { ContentCopy, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useInjection } from './hooks';
import { PassGeneratorService } from './services';
import { addSwitcher, deleteSwitcher } from './state/cabinet.slice';
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

  const handleDeleteSwitcher = (switcherKey: string) => {
    dispatch(deleteSwitcher(switcherKey));
  };

  const copyPassword = (generatedPassword: string) =>
    navigator.clipboard.writeText(generatedPassword);

  const handleCopySwitcherPassword = async (
    masterPassword: string,
    key: string,
    length: number
  ) => {
    const generatedPassword = await passGeneratorService.generatePassword(
      masterPassword,
      key,
      length
    );
    copyPassword(generatedPassword);
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
      <TextField
        label="Key"
        value={switcherKey}
        size="small"
        margin="dense"
        fullWidth
        onChange={(e) => setSwitcherKey(e.target.value)}
      />
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
        <IconButton onClick={() => copyPassword.bind(generatedPassword)}>
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
        {Object.values(cabinet).map(({ key, length, name }) => (
          <Grid item key={key}>
            <Card>
              <CardContent>
                <List>
                  <ListItem sx={{ p: 1 }}>
                    <Box display={'flex'} gap={1} alignItems={'center'}>
                      <Typography variant="h5">{name}</Typography>
                      <IconButton onClick={() => handleDeleteSwitcher(key)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </ListItem>
                  <ListItem sx={{ p: 1 }}>
                    <Typography>&bull; Key : {key}</Typography>
                  </ListItem>
                  <ListItem sx={{ p: 1 }}>
                    <Typography>&bull; Length : {length}</Typography>
                  </ListItem>
                  <ListItem sx={{ p: 1 }}>
                    <Button
                      variant="contained"
                      onClick={() =>
                        handleCopySwitcherPassword(
                          masterPassword,
                          key,
                          length
                        ).catch(console.error)
                      }
                    >
                      Copy Password
                    </Button>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;
