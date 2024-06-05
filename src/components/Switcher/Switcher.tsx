import {
  ContentCopy,
  Delete,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useInjection } from '../../hooks';
import { PassGeneratorService } from '../../services';

export type SwitcherProps = {
  name: string;
  key: string;
  length: number;
  masterPassword?: string;
  onDeleteSwitch: (switchKey: string) => void;
};

export const Switcher = ({
  length,
  name,
  key,
  masterPassword = '',
  onDeleteSwitch,
}: SwitcherProps) => {
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const passGeneratorService = useInjection(PassGeneratorService);

  const generatedPasswordVisual = useMemo(
    () =>
      visible
        ? generatedPassword
        : Array(generatedPassword.length).fill('•').join(''),
    [generatedPassword, visible],
  );

  useEffect(() => {
    const fn = async () => {
      const generatedPassword = await passGeneratorService.generatePassword(
        masterPassword,
        key,
        length,
      );

      setGeneratedPassword(generatedPassword);
    };

    fn();
  }, [length, masterPassword, passGeneratorService, key]);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword).catch(console.error);
  };
  return (
    <Card>
      <CardContent>
        <List>
          <ListItem sx={{ p: 1 }}>
            <Box display={'flex'} gap={1} alignItems={'center'}>
              <Typography variant="h5">{name}</Typography>
              <IconButton onClick={() => onDeleteSwitch(key)}>
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
            <Box display={'flex'} gap={1} alignItems={'center'} width="100%">
              <IconButton onClick={handleCopyPassword}>
                <ContentCopy />
              </IconButton>
              <IconButton onClick={() => setVisible((v) => !v)}>
                {visible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
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
            </Box>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
