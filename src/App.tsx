import { Box, Typography, styled } from '@mui/material';
import image from './assets/images/lock-alt.svg';
import './fonts.css';
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
  return (
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
      </Box>
      <MenuView />
      <MasterPasswordView />
      <GroupsView />
      <ImportView />
    </Box>
  );
}

export default App;
