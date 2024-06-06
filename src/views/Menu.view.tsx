import { Box, Button } from '@mui/material';
import { useState } from 'react';
import { GroupCreationView } from './GroupCreation.view';
import { SwitcherCreationView } from './SwitcherCreation.view';

export const MenuView = () => {
  const [switcherCreationView, setSwitcherCreationView] = useState(false);
  const [groupCreationView, setGroupCreationView] = useState(false);

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
