import { Box, Button, List, ListItem, TextField } from '@mui/material';
import { useState } from 'react';
import { Group } from '../components';
import { useAppDispatch, useAppSelector } from '../state';
import { addGroup, selectAllGroups } from '../state/groups.slice';
import { selectAllSwitchers } from '../state/switchers.slice';

export const GroupView = () => {
  const [groupName, setGroupName] = useState('');

  const groups = useAppSelector(selectAllGroups);
  const switchers = useAppSelector(selectAllSwitchers);
  const dispatch = useAppDispatch();

  const handleAddGroup = () => {
    dispatch(addGroup(groupName));
  };

  return (
    <Box gap={1}>
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <TextField
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          label="Group Name"
          size="small"
        />
        <Button onClick={handleAddGroup} variant="contained">
          Add Group
        </Button>
      </Box>
      <List>
        {groups.map((group) => (
          <ListItem key={group.id}>
            <Group
              switchers={switchers.filter(
                ({ groupName }) => group.name === groupName,
              )}
              onDeleteSwitch={() => undefined}
              {...group}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
