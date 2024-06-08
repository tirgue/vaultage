import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useInjection } from '../hooks';
import { SharingService } from '../services';

export const ImportView = () => {
  const [visible, setVisible] = useState(!!window.location.hash);

  const sharingService = useInjection(SharingService);

  const handleHide = () => {
    window.location.hash = '';
    setVisible(false);
  };

  const handleImport = () => {
    sharingService.import();
    handleHide();
  };

  return (
    <Dialog open={visible}>
      <DialogTitle>Import Config</DialogTitle>
      <DialogContent>
        <Typography>Do you want to import a new configuration ?</Typography>
        <Typography>This will dicard your current settings</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleHide} color="error">
          Cancel
        </Button>
        <Button onClick={handleImport}>Import</Button>
      </DialogActions>
    </Dialog>
  );
};
