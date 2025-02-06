import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3', // Azul Claro
    },
    secondary: {
      main: '#4CAF50', // Verde Claro
    },
    background: {
      default: '#F5F5F5', // Cinza Claro para o fundo
      paper: '#FFFFFF', // Branco para cards e tabelas
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

export default theme;