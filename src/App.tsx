import { ContentCopy } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useInjection } from './hooks';
import { PassGeneratorService } from './services';

function App() {
  const [password, setPassword] = useState('');
  const [switcher, setSwitcher] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');

  const passGeneratorService = useInjection(PassGeneratorService);

  useEffect(() => {
    const fn = async () => {
      const generatedPassword = await passGeneratorService.generatePassword(
        password,
        switcher
      );
      setGeneratedPassword(generatedPassword);
    };
    fn();
  }, [password, switcher]);

  return (
    <Box>
      <Typography variant="h2">Demo</Typography>
      <Box display={'flex'} alignItems={'center'}>
        <TextField
          label="Password"
          value={password}
          size="small"
          margin="dense"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
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
