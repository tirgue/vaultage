import { Box, Button, List, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Group, SwitchersProp } from '../components';
import { useInjection } from '../hooks';
import { PassGeneratorService } from '../services';
import { useAppDispatch, useAppSelector } from '../state';
import { addGroup, selectAllGroups } from '../state/groups.slice';
import { selectMasterPassword } from '../state/master-password.slice';
import { selectAllSwitchers } from '../state/switchers.slice';

export const GroupsView = () => {
  const [groupName, setGroupName] = useState('');
  const [switchersProp, setSwitchersProp] = useState<SwitchersProp>([]);

  const masterPassword = useAppSelector(selectMasterPassword);
  const groups = useAppSelector(selectAllGroups);
  const switchers = useAppSelector(selectAllSwitchers);

  const dispatch = useAppDispatch();

  const passGeneratorService = useInjection(PassGeneratorService);

  useEffect(() => {
    const fn = async () => {
      const promises = switchers.map(async (switcher) => {
        const generatedPassword = await passGeneratorService.generatePassword(
          masterPassword,
          switcher.key,
          switcher.length,
        );

        return {
          ...switcher,
          generatedPassword,
        };
      });

      const newSwitchers = await Promise.all(promises);
      setSwitchersProp(newSwitchers);
    };
    fn();
  }, [masterPassword, passGeneratorService, switchers]);

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
          <Group
            key={group.id}
            switchers={switchersProp.filter(
              ({ groupName }) => group.name === groupName,
            )}
            onDeleteSwitch={() => undefined}
            onDeleteGroup={() => undefined}
            {...group}
          />
        ))}
      </List>
    </Box>
  );
};
