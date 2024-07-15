import { Delete } from '@mui/icons-material';
import { Box, Button, IconButton, Popover, Typography } from '@mui/material';
import { useRef, useState } from 'react';

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
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          m={1}
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
        </Box>
      </Popover>
    </>
  );
};
