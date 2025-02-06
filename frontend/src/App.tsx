import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Patients from './pages/Patients';
import Clinics from './pages/Clinics';
import PatientClinics from './pages/PatientClinics';

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
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

const App: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Verifica se a tela é pequena

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="fixed" sx={{ width: '100%', top: 0, left: 0 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            {/* Título centralizado */}
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
              <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                Sistema de Clínicas e Pacientes
              </Typography>
            </Box>

            {/* Menu de hambúrguer para telas pequenas */}
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Menu de navegação para telas maiores */}
            {!isMobile && (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button color="inherit" component={Link} to="/patients">
                  Pacientes
                </Button>
                <Button color="inherit" component={Link} to="/clinics">
                  Clínicas
                </Button>
                <Button color="inherit" component={Link} to="/assignments">
                  Relacionamentos
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>

        {/* Menu de navegação para telas pequenas */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ width: '100%' }}
        >
          <MenuItem component={Link} to="/patients" onClick={handleMenuClose}>
            Pacientes
          </MenuItem>
          <MenuItem component={Link} to="/clinics" onClick={handleMenuClose}>
            Clínicas
          </MenuItem>
          <MenuItem component={Link} to="/assignments" onClick={handleMenuClose}>
            Relacionamentos
          </MenuItem>
        </Menu>

        {/* Conteúdo principal */}
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default', p: 3, width: '100%' }}>
          <Routes>
            <Route path="/patients" element={<Patients />} />
            <Route path="/clinics" element={<Clinics />} />
            <Route path="/assignments" element={<PatientClinics />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
