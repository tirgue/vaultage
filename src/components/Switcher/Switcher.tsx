import { Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';

export type SwitcherProps = {
  name: string;
  switchKey: string;
  length: number;
  onDeleteSwitch: (switchKey: string) => void;
  onCopyPassword: (switchKey: string, length: number) => void;
};

export const Switcher = ({
  length,
  name,
  switchKey,
  onDeleteSwitch,
  onCopyPassword,
}: SwitcherProps) => {
  return (
    <Card>
      <CardContent>
        <List>
          <ListItem sx={{ p: 1 }}>
            <Box display={'flex'} gap={1} alignItems={'center'}>
              <Typography variant="h5">{name}</Typography>
              <IconButton onClick={() => onDeleteSwitch(switchKey)}>
                <Delete />
              </IconButton>
            </Box>
          </ListItem>
          <ListItem sx={{ p: 1 }}>
            <Typography>&bull; Key : {switchKey}</Typography>
          </ListItem>
          <ListItem sx={{ p: 1 }}>
            <Typography>&bull; Length : {length}</Typography>
          </ListItem>
          <ListItem sx={{ p: 1 }}>
            <Button
              variant="contained"
              onClick={() => onCopyPassword(switchKey, length)}
            >
              Copy Password
            </Button>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
