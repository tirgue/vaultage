import { ContentCopy } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useInjection } from './hooks';
import { PassGeneratorService } from './services';

function App() {
  const [masterPassword, setMasterPassword] = useState('');
  const [switcher, setSwitcher] = useState('');
  const [length, setLength] = useState(15);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const passGeneratorService = useInjection(PassGeneratorService);

  useEffect(() => {
    const fn = async () => {
      const generatedPassword = await passGeneratorService.generatePassword(
        masterPassword,
        switcher,
        length
      );
      setGeneratedPassword(generatedPassword);
    };
    fn();
  }, [length, passGeneratorService, masterPassword, switcher]);

  return (
    <Box>
      <Typography variant="h2">Demo</Typography>
      <Box display={'flex'} alignItems={'center'}>
        <TextField
          label="Master Password"
          value={masterPassword}
          size="small"
          margin="dense"
          fullWidth
          onChange={(e) => setMasterPassword(e.target.value)}
        />
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <TextField
          label="Switcher"
          value={switcher}
          size="small"
          margin="dense"
          fullWidth
          onChange={(e) => setSwitcher(e.target.value)}
        />
      </Box>
      <Box>
        <TextField
          label="Password Length"
          value={length}
          size="small"
          margin="dense"
          type="number"
          onChange={(e) => setLength(Math.max(parseInt(e.target.value, 10), 0))}
        />
      </Box>
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
    </Box>
  );
}

export default App;
