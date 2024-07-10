import { List, TextField, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Group, SwitchersProp } from '../components';
import { useAlertMessage, useInjection } from '../hooks';
import { PassGeneratorService } from '../services';
import { useAppDispatch, useAppSelector } from '../state';
import {
  deleteGroup,
  deleteSwitcher,
  selectAllGroups,
  selectAllSwitchers,
  selectMasterPassword,
} from '../state/slices';
import { SwitcherCreationView } from './SwitcherCreation.view';

const NoScrollList = styled(List)({
  padding: 0,
  overflow: 'auto',
  '-ms-overflow-style': 'none',
  'scrollbar-width': 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const GroupsView = () => {
  const [switchersProp, setSwitchersProp] = useState<SwitchersProp>([]);
  const [search, setSearch] = useState('');
  const [switcherCreationView, setSwitcherCreationView] = useState(false);
  const [switcherEditionKey, setSwitcherEditionKey] = useState('');

  const masterPassword = useAppSelector(selectMasterPassword);
  const groups = useAppSelector(selectAllGroups);
  const switchers = useAppSelector(selectAllSwitchers);

  const dispatch = useAppDispatch();

  const passGeneratorService = useInjection(PassGeneratorService);

  const { triggerAlert } = useAlertMessage();

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
  }, [masterPassword, passGeneratorService, search, switchers]);

  const handleDeleteSwitcher = (name: string) => {
    dispatch(deleteSwitcher(name));
    triggerAlert('Switcher has been deleted');
  };

  const handleEditSwitcher = (key: string) => {
    setSwitcherEditionKey(key);
    setSwitcherCreationView(true);
  };

  const handleDeleteGroup = (name: string) => {
    dispatch(deleteGroup(name));
    triggerAlert('Group has been deleted');
  };

  const handleCopy = () => {
    triggerAlert(`Password has been copied to your clipboard`);
  };

  return (
    <>
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        label="Search"
        fullWidth
      ></TextField>
      <NoScrollList sx={{ pb: 3 }}>
        {groups.map((group) => (
          <Group
            key={group.id}
            switchers={switchersProp.filter(
              ({ groupName }) => group.name === groupName,
            )}
            onDeleteSwitcher={handleDeleteSwitcher}
            onEditSwitcher={handleEditSwitcher}
            onDeleteGroup={handleDeleteGroup}
            filter={search}
            onCopy={handleCopy}
            {...group}
          />
        ))}
      </NoScrollList>
      <SwitcherCreationView
        visible={switcherCreationView}
        onHide={() => setSwitcherCreationView(false)}
        defaultSwitcher={switchers.find(
          (switcher) => switcher.key === switcherEditionKey,
        )}
      />
    </>
  );
};
