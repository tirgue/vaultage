import { Box, List } from '@mui/material';
import { useEffect, useState } from 'react';
import { Group, SwitchersProp } from '../components';
import { useInjection } from '../hooks';
import { PassGeneratorService } from '../services';
import { useAppSelector } from '../state';
import { selectAllGroups } from '../state/groups.slice';
import { selectMasterPassword } from '../state/master-password.slice';
import { selectAllSwitchers } from '../state/switchers.slice';

export const GroupsView = () => {
  const [switchersProp, setSwitchersProp] = useState<SwitchersProp>([]);

  const masterPassword = useAppSelector(selectMasterPassword);
  const groups = useAppSelector(selectAllGroups);
  const switchers = useAppSelector(selectAllSwitchers);

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
            onDeleteSwitch={() => undefined}
            onDeleteGroup={() => undefined}
            {...group}
          />
        ))}
      </List>
    </Box>
  );
};
