import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4182d9',
    },
    secondary: {
      main: '#d99841',
    },
    error: {
      main: '#d94b41',
    },
    success: {
      main: '#41d997',
    },
    info: {
      main: '#3941b3',
    },
    warning: {
      main: '#cfd941',
    },
  },
  shape: {
    borderRadius: 2,
  },
  typography: {
    fontSize: 12,
    fontWeightLight: 300,
  },
});
