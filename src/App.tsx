import { Box, Typography } from '@mui/material';
import { GroupsView } from './views/Groups.view';
import { MasterPasswordView } from './views/MasterPassword.view';
import { MenuView } from './views/Menu.view';

function App() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      m="auto"
      p={3}
      gap={2}
      maxWidth="700px"
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        Vaultage Demo
      </Typography>
      <MenuView />
      <MasterPasswordView />
      <GroupsView />
    </Box>
  );
}

export default App;
