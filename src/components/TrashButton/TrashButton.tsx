import { Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Popover,
  Typography,
  styled,
} from '@mui/material';
import { useRef, useState } from 'react';

const BoxArrow = styled(Box)({
  position: 'relative',
  ':after': {
    content: '""',
    position: 'absolute',
    backgroundColor: '#2f2f2f',
    top: '-0.4em',
    height: '0.8em',
    width: '0.8em',
    rotate: '45deg',
    borderRadius: '0.1em 0 0 0',
  },
});

export type TrashButtonProps = {
  onDelete: () => void;
};

export const TrashButton = ({ onDelete }: TrashButtonProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const handleOpenDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleCloseDelete: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setOpen(false);
  };
  return (
    <>
      <IconButton ref={ref} onClick={handleOpenDelete}>
        <Delete />
      </IconButton>
      <Popover
        open={open}
        onClose={handleCloseDelete}
        anchorEl={ref.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {
            style: {
              overflow: 'visible',
            },
          },
        }}
        sx={{ mt: 1 }}
      >
        <BoxArrow
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          p={1}
          gap={1}
        >
          <Typography>Are you sure ?</Typography>
          <Box display={'flex'} gap={1}>
            <Button
              onClick={handleCloseDelete}
              variant="contained"
              size="small"
              color="error"
            >
              No
            </Button>
            <Button onClick={handleDelete} variant="contained" size="small">
              Yes
            </Button>
          </Box>
        </BoxArrow>
      </Popover>
    </>
  );
};
