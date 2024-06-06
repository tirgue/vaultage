import { Box, Typography } from '@mui/material';
import { GroupsView } from './views/Groups.view';
import { MasterPasswordView } from './views/MasterPassword.view';
import { MenuView } from './views/Menu.view';

function App() {
  return (
    <Box m={3} display={'flex'} flexDirection={'column'} gap={3}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Vaultage Demo
      </Typography>
      <MenuView />
      <MasterPasswordView />
      <GroupsView />
    </Box>
  );
}

export default App;
