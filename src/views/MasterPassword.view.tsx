import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../state';
import { selectMasterPassword, setMasterPassword } from '../state/slices';

export const MasterPasswordView = () => {
  const [visible, setVisible] = useState(false);

  const masterPassword = useAppSelector(selectMasterPassword);
  const dispatch = useAppDispatch();

  const handleOnMasterPasswordChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    dispatch(setMasterPassword(e.target.value));
  };

  return (
    <Box display={'flex'} alignItems={'center'} gap={1}>
      <TextField
        size="small"
        label="Master Password"
        type={visible ? 'text' : 'password'}
        value={masterPassword}
        InputProps={{ style: { fontFamily: 'Ubuntu Sans Mono' } }}
        onChange={handleOnMasterPasswordChange}
        fullWidth
      ></TextField>
      <IconButton onClick={() => setVisible((v) => !v)}>
        {visible ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </Box>
  );
};
