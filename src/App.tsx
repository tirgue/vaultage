import { Download } from '@mui/icons-material';
import { Box, IconButton, Typography, styled } from '@mui/material';
import image from './assets/images/lock-alt.svg';
import './fonts.css';
import { AlertContext, useInitAlertMessage, useInstallPrompt } from './hooks';
import { AlertMessageView } from './views/AlertMessage.view';
import { GroupsView } from './views/Groups.view';
import { ImportView } from './views/Import.view';
import { MasterPasswordView } from './views/MasterPassword.view';
import { MenuView } from './views/Menu.view';

const Image = styled('img')({
  height: '4em',
  backgroundColor: '#ffffff50',
  borderRadius: '25%',
  padding: '0.2em',
});

function App() {
  const [canInstall, triggerInstall] = useInstallPrompt();
  const alertContextValue = useInitAlertMessage();

  return (
    <AlertContext.Provider value={alertContextValue}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        m="auto"
        p={3}
        gap={2}
        maxWidth="700px"
      >
        <Box display={'flex'} alignItems={'center'} gap={3}>
          <Image src={image} />
          <Typography variant="h4">Vaultage Demo</Typography>
          {canInstall ? (
            <IconButton onClick={triggerInstall}>
              <Download />
            </IconButton>
          ) : null}
        </Box>
        <MenuView />
        <MasterPasswordView />
        <GroupsView />
        <ImportView />
        <AlertMessageView />
      </Box>
    </AlertContext.Provider>
  );
}

export default App;
