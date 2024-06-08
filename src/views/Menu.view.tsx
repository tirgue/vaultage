import { Share } from '@mui/icons-material';
import { Box, Button, IconButton } from '@mui/material';
import { useState } from 'react';
import { useInjection } from '../hooks';
import { SharingService } from '../services';
import { GroupCreationView } from './GroupCreation.view';
import { SwitcherCreationView } from './SwitcherCreation.view';

export const MenuView = () => {
  const [switcherCreationView, setSwitcherCreationView] = useState(false);
  const [groupCreationView, setGroupCreationView] = useState(false);

  const sharingService = useInjection(SharingService);

  const handleExport = () => {
    const exportUrl = sharingService.getExportUrl();
    navigator.clipboard.writeText(exportUrl).catch(console.error);
  };

  return (
    <>
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Button onClick={() => setGroupCreationView(true)} variant="contained">
          Add Group
        </Button>
        <Button
          onClick={() => setSwitcherCreationView(true)}
          variant="contained"
        >
          Add Switcher
        </Button>
        <IconButton onClick={handleExport}>
          <Share />
        </IconButton>
      </Box>
      <SwitcherCreationView
        visible={switcherCreationView}
        onHide={() => setSwitcherCreationView(false)}
      />
      <GroupCreationView
        visible={groupCreationView}
        onHide={() => setGroupCreationView(false)}
      />
    </>
  );
};
