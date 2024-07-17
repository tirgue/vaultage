import { Edit } from '@mui/icons-material';
import {
  Box,
  IconButton,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { PasswordViewer } from '../PasswordViewer';
import { TrashButton } from '../TrashButton';

export type SwitcherProps = {
  name: string;
  switcherKey: string;
  length: number;
  generatedPassword?: string;
  onDeleteSwitcher: (switchKey: string) => void;
  onEditSwitcher: (switchKey: string) => void;
  onCopy?: () => void;
};

export const Switcher = ({
  length,
  name,
  switcherKey,
  generatedPassword = '',
  onDeleteSwitcher,
  onEditSwitcher,
  onCopy,
}: SwitcherProps) => {
  return (
    <ListItem component={Box} flexDirection={'column'}>
      <Box display={'flex'} alignItems={'center'} width="100%">
        <ListItemText
          primary={
            <Typography whiteSpace="nowrap" width="fit-content">
              {name}
            </Typography>
          }
          secondary={
            <Typography
              variant="body2"
              whiteSpace="nowrap"
              width="fit-content"
              sx={{
                fontStyle: 'italic',
                fontFamily: 'Ubuntu Sans Mono',
              }}
            >
              {switcherKey} - {length}
            </Typography>
          }
          sx={{ minWidth: 'initial' }}
        />
        <Box display={'flex'} gap={1}>
          <IconButton onClick={() => onEditSwitcher(switcherKey)}>
            <Edit />
          </IconButton>
          <TrashButton onDelete={() => onDeleteSwitcher(switcherKey)} />
        </Box>
      </Box>
      <PasswordViewer generatedPassword={generatedPassword} onCopy={onCopy} />
    </ListItem>
  );
};
