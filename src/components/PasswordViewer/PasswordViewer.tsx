import { ContentCopy, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import { useMemo, useState } from 'react';

export type PesswordViewerProps = {
  generatedPassword: string;
};

export const PasswordViewer = ({ generatedPassword }: PesswordViewerProps) => {
  const [visible, setVisible] = useState(false);

  const generatedPasswordVisual = useMemo(
    () =>
      visible
        ? generatedPassword
        : Array(generatedPassword.length).fill('•').join(''),
    [generatedPassword, visible],
  );

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword).catch(console.error);
  };
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      gap={1}
      width="100%"
    >
      <TextField
        size="small"
        margin="dense"
        sx={{ input: { cursor: 'pointer' } }}
        fullWidth
        InputProps={{ readOnly: true }}
        InputLabelProps={{ style: { fontFamily: 'monospace' } }}
        value={generatedPasswordVisual}
        onClick={handleCopyPassword}
      />
      <IconButton onClick={handleCopyPassword}>
        <ContentCopy />
      </IconButton>
      <IconButton onClick={() => setVisible((v) => !v)}>
        {visible ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </Box>
  );
};
