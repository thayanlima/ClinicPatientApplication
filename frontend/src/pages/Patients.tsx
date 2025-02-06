import React, { useEffect, useState } from 'react';
import { getPatients, createPatient, updatePatient, deletePatient, Patient } from '../services/patientService';
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

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [newPatient, setNewPatient] = useState<Omit<Patient, 'id'>>({ name: '', age: 0 });
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
    }
  };

  const handleCreatePatient = async () => {
    try {
      await createPatient(newPatient);
      setNewPatient({ name: '', age: 0 });
      setOpenDialog(false);
      fetchPatients();
    } catch (error) {
      console.error('Erro ao criar paciente:', error);
    }
  };

  const handleUpdatePatient = async () => {
    if (editingPatient) {
      try {
        await updatePatient(editingPatient.id, editingPatient);
        setEditingPatient(null);
        fetchPatients();
      } catch (error) {
        console.error('Erro ao atualizar paciente:', error);
      }
    }
  };

  const handleDeletePatient = async (id: number) => {
    try {
      await deletePatient(id);
      fetchPatients();
    } catch (error) {
      console.error('Erro ao excluir paciente:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary" sx={{ marginTop: '80px' }}>
          Gerenciamento de Pacientes
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
              Adicionar Paciente
            </Button>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nome</TableCell>
                    <TableCell align="center">Idade</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell align="center">{patient.name}</TableCell>
                      <TableCell align="center">{patient.age}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => setEditingPatient(patient)}>
                          <Edit color="primary" />
                        </IconButton>
                        <IconButton onClick={() => handleDeletePatient(patient.id)}>
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

        {/* Diálogo para adicionar/editar paciente */}
        <Dialog open={openDialog || !!editingPatient} onClose={() => { setOpenDialog(false); setEditingPatient(null); }}>
          <DialogTitle align="center">
            {editingPatient ? 'Editar Paciente' : 'Adicionar Paciente'}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Nome"
              fullWidth
              margin="normal"
              value={editingPatient ? editingPatient.name : newPatient.name}
              onChange={(e) =>
                editingPatient
                  ? setEditingPatient({ ...editingPatient, name: e.target.value })
                  : setNewPatient({ ...newPatient, name: e.target.value })
              }
            />
            <TextField
              label="Idade"
              type="number"
              fullWidth
              margin="normal"
              value={editingPatient ? editingPatient.age : newPatient.age}
              onChange={(e) =>
                editingPatient
                  ? setEditingPatient({ ...editingPatient, age: +e.target.value })
                  : setNewPatient({ ...newPatient, age: +e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpenDialog(false); setEditingPatient(null); }}>Cancelar</Button>
            <Button onClick={editingPatient ? handleUpdatePatient : handleCreatePatient} color="primary">
              {editingPatient ? 'Salvar' : 'Adicionar'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default Patients;
