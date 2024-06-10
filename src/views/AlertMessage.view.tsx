import { Alert, Paper, Stack, keyframes, styled } from '@mui/material';
import { useAlertMessage } from '../hooks';

const animation = keyframes([
  '0% { opacity: 0%; }',
  '10% { opacity: 100%; }',
  '90% { opacity: 100%; }',
  '100% { opacity: 0%; }',
]);

const Item = styled(Paper)({
  animationName: animation,
  animationDuration: '4s',
});

export const AlertMessageView = () => {
  const { alertList } = useAlertMessage();
  return (
    <Stack position={'fixed'} bottom={8} left={8} gap={1} zIndex={10}>
      {alertList.map(({ message, timestamp }) => (
        <Item key={timestamp}>
          <Alert variant="outlined">{message}</Alert>
        </Item>
      ))}
    </Stack>
  );
};
