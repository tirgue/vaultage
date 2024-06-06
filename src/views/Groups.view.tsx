import { Box, List } from '@mui/material';
import { useEffect, useState } from 'react';
import { Group, SwitchersProp } from '../components';
import { useInjection } from '../hooks';
import { PassGeneratorService } from '../services';
import { useAppDispatch, useAppSelector } from '../state';
import { deleteGroup, selectAllGroups } from '../state/groups.slice';
import { selectMasterPassword } from '../state/master-password.slice';
import { deleteSwitcher, selectAllSwitchers } from '../state/switchers.slice';

export const GroupsView = () => {
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

  const handleDeleteSwitcher = (name: string) => {
    dispatch(deleteSwitcher(name));
  };

  const handleDeleteGroup = (name: string) => {
    dispatch(deleteGroup(name));
  };

  return (
    <Box gap={1}>
      <Box display={'flex'} alignItems={'center'} gap={1}></Box>
      <List>
        {groups.map((group) => (
          <Group
            key={group.id}
            switchers={switchersProp.filter(
              ({ groupName }) => group.name === groupName,
            )}
            onDeleteSwitcher={handleDeleteSwitcher}
            onDeleteGroup={handleDeleteGroup}
            {...group}
          />
        ))}
      </List>
    </Box>
  );
};
