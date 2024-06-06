import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { GroupsView } from './views/Groups.view';
import { MasterPasswordView } from './views/MasterPassword.view';
import { SwitcherCreationView } from './views/SwitcherCreation.view';

function App() {
  const [switcherCreationView, setSwitcherCreationView] = useState(false);

  return (
    <Box m={3} display={'flex'} flexDirection={'column'} gap={3}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Vaultage Demo
      </Typography>
      <Button onClick={() => setSwitcherCreationView(true)}>
        Add Switcher
      </Button>
      <SwitcherCreationView
        visible={switcherCreationView}
        onHide={() => setSwitcherCreationView(false)}
      />
      <MasterPasswordView />
      <GroupsView />
    </Box>
  );
}

export default App;
