import { ContentCopy, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import { useMemo, useState } from 'react';

export type PesswordViewerProps = {
  generatedPassword: string;
  onCopy?: () => void;
};

export const PasswordViewer = ({
  generatedPassword,
  onCopy,
}: PesswordViewerProps) => {
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
    onCopy?.();
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
        InputProps={{
          readOnly: true,
          style: { fontFamily: 'Ubuntu Sans Mono' },
        }}
        value={generatedPasswordVisual}
        onClick={handleCopyPassword}
      />
      <IconButton onClick={() => setVisible((v) => !v)}>
        {visible ? <VisibilityOff /> : <Visibility />}
      </IconButton>
      <IconButton onClick={handleCopyPassword}>
        <ContentCopy />
      </IconButton>
    </Box>
  );
};
