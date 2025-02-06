import React, { useEffect, useState } from 'react';
import { getClinic, createClinic, updateClinic, deleteClinic, Clinic } from '../services/clinicService';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Box,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

const Clinics: React.FC = () => {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [newClinic, setNewClinic] = useState<Omit<Clinic, 'id'>>({ name: '', address: '' });
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const data = await getClinic();
      setClinics(data);
    } catch (error) {
      console.error('Erro ao buscar clínicas:', error);
    }
  };

  const handleCreateClinic = async () => {
    try {
      await createClinic(newClinic);
      setNewClinic({ name: '', address: '' });
      setOpenDialog(false);
      fetchClinics();
    } catch (error) {
      console.error('Erro ao criar clínica:', error);
    }
  };

  const handleUpdateClinic = async () => {
    if (editingClinic) {
      try {
        await updateClinic(editingClinic.id, editingClinic);
        setEditingClinic(null);
        fetchClinics();
      } catch (error) {
        console.error('Erro ao atualizar clínica:', error);
      }
    }
  };

  const handleDeleteClinic = async (id: number) => {
    try {
      await deleteClinic(id);
      fetchClinics();
    } catch (error) {
      console.error('Erro ao excluir clínica:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary" sx={{ marginTop: '80px' }}>
          Gerenciamento de Clínicas
        </Typography>

        <Grid container justifyContent="center" spacing={3}>
          <Grid item xs={12} md={8}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
              fullWidth
              sx={{ mb: 3 }}
            >
              Adicionar Clínica
            </Button>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">Endereço</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clinics.map((clinic) => (
                    <TableRow key={clinic.id}>
                      <TableCell align="center">{clinic.name}</TableCell>
                      <TableCell align="center">{clinic.address}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => setEditingClinic(clinic)}>
                          <Edit color="primary" />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClinic(clinic.id)}>
                          <Delete color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        {/* Diálogo para adicionar/editar clínica */}
        <Dialog open={openDialog || !!editingClinic} onClose={() => { setOpenDialog(false); setEditingClinic(null); }}>
          <DialogTitle align="center">
            {editingClinic ? 'Editar Clínica' : 'Adicionar Clínica'}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Nome"
              fullWidth
              margin="normal"
              value={editingClinic ? editingClinic.name : newClinic.name}
              onChange={(e) =>
                editingClinic
                  ? setEditingClinic({ ...editingClinic, name: e.target.value })
                  : setNewClinic({ ...newClinic, name: e.target.value })
              }
            />
            <TextField
              label="Endereço"
              fullWidth
              margin="normal"
              value={editingClinic ? editingClinic.address : newClinic.address}
              onChange={(e) =>
                editingClinic
                  ? setEditingClinic({ ...editingClinic, address: e.target.value })
                  : setNewClinic({ ...newClinic, address: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpenDialog(false); setEditingClinic(null); }}>Cancelar</Button>
            <Button onClick={editingClinic ? handleUpdateClinic : handleCreateClinic} color="primary">
              {editingClinic ? 'Salvar' : 'Adicionar'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Clinics;
