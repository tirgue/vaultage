import { ContentCopy, Shuffle } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Split } from './components';
import { useInjection } from './hooks';
import { PassGeneratorService } from './services';
import { selectAllGroups } from './state/groups.slice';
import { useAppDispatch, useAppSelector } from './state/store';
import { addSwitcher } from './state/switchers.slice';
import { GroupsView } from './views/Groups.view';
import { MasterPasswordView } from './views/MasterPassword.view';

function App() {
  const [masterPassword, setMasterPassword] = useState('');
  const [switcherName, setSwitcherName] = useState('');
  const [group, setGroup] = useState('');
  const [switcherKey, setSwitcherKey] = useState('');
  const [length, setLength] = useState(15);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const passGeneratorService = useInjection(PassGeneratorService);

  const groups = useAppSelector(selectAllGroups);
  const dispatch = useAppDispatch();

  const handleAddSwitcher = () => {
    dispatch(
      addSwitcher({
        key: switcherKey,
        name: switcherName,
        groupName: group,
        length,
      }),
    );
  };

  const handleRandomSwitcherKey = () => {
    setSwitcherKey(Math.random().toString(36).slice(2));
  };

  return (
    <Box m={3} display={'flex'} flexDirection={'column'} gap={3}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Vaultage Demo
      </Typography>
      <MasterPasswordView />
      <GroupsView />
    </Box>
  );
}

export default App;
