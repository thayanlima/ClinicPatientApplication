import React, { useEffect, useState } from 'react';
import {
  getPatientClinics,
  createPatientClinic,
  updatePatientClinic,
  deletePatientClinic,
  PatientClinic,
} from '../services/patientClinicService';
import { getPatients, Patient } from '../services/patientService'; // Serviço para buscar pacientes
import { getClinic, Clinic } from '../services/clinicService'; // Serviço para buscar clínicas
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

const PatientClinics: React.FC = () => {
  const [patientClinics, setPatientClinics] = useState<PatientClinic[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]); // Lista de pacientes
  const [clinics, setClinics] = useState<Clinic[]>([]); // Lista de clínicas
  const [newPatientClinic, setNewPatientClinic] = useState<Omit<PatientClinic, 'id'>>({
    patientId: 0,
    clinicId: 0,
    patientName: '',
    clinicName: '',
  });
  const [editingPatientClinic, setEditingPatientClinic] = useState<PatientClinic | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchPatientClinics();
    fetchPatients();
    fetchClinics();
  }, []);

  // Buscar relacionamentos
  const fetchPatientClinics = async () => {
    try {
      const data = await getPatientClinics();
      setPatientClinics(data);
    } catch (error) {
      console.error('Erro ao buscar relacionamentos de pacientes e clínicas:', error);
    }
  };

  // Buscar pacientes
  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
    }
  };

  // Buscar clínicas
  const fetchClinics = async () => {
    try {
      const data = await getClinic();
      setClinics(data);
    } catch (error) {
      console.error('Erro ao buscar clínicas:', error);
    }
  };

  // Criar relacionamento
  const handleCreatePatientClinic = async () => {
    try {
      await createPatientClinic(newPatientClinic);
      setNewPatientClinic({ patientId: 0, clinicId: 0, patientName: '', clinicName: '' });
      setOpenDialog(false);
      fetchPatientClinics();
    } catch (error) {
      console.error('Erro ao criar relacionamento:', error);
    }
  };

  // Atualizar relacionamento
  const handleUpdatePatientClinic = async () => {
    if (editingPatientClinic) {
      try {
        await updatePatientClinic(editingPatientClinic.id, {
          patientId: editingPatientClinic.patientId,
          clinicId: editingPatientClinic.clinicId,
        });
        setEditingPatientClinic(null);
        fetchPatientClinics();
      } catch (error) {
        console.error('Erro ao atualizar relacionamento:', error);
      }
    }
  };

  // Excluir relacionamento
  const handleDeletePatientClinic = async (id: number) => {
    try {
      await deletePatientClinic(id);
      fetchPatientClinics();
    } catch (error) {
      console.error('Erro ao excluir relacionamento:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Título centralizado com espaçamento superior */}
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary" sx={{ marginTop: '80px' }}>
          Gerenciamento de Relacionamento Paciente-Clínica
        </Typography>

        {/* Container para centralizar a tabela */}
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
              Adicionar Relacionamento
            </Button>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Paciente</TableCell>
                    <TableCell align="center">Clínica</TableCell>
                    <TableCell align="center">Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patientClinics.map((patientClinic) => (
                    <TableRow key={patientClinic.id}>
                      <TableCell align="center">{patientClinic.patientName || 'N/A'}</TableCell>
                      <TableCell align="center">{patientClinic.clinicName || 'N/A'}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => setEditingPatientClinic(patientClinic)}>
                          <Edit color="primary" />
                        </IconButton>
                        <IconButton onClick={() => handleDeletePatientClinic(patientClinic.id)}>
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

        {/* Diálogo para adicionar/editar relacionamento */}
        <Dialog open={openDialog || !!editingPatientClinic} onClose={() => { setOpenDialog(false); setEditingPatientClinic(null); }}>
          <DialogTitle align="center">
            {editingPatientClinic ? 'Editar Relacionamento' : 'Adicionar Relacionamento'}
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <InputLabel>Paciente</InputLabel>
              <Select
                value={editingPatientClinic ? editingPatientClinic.patientId : newPatientClinic.patientId}
                onChange={(e) =>
                  editingPatientClinic
                    ? setEditingPatientClinic({ ...editingPatientClinic, patientId: e.target.value as number })
                    : setNewPatientClinic({ ...newPatientClinic, patientId: e.target.value as number })
                }
              >
                {patients.map((patient) => (
                  <MenuItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Clínica</InputLabel>
              <Select
                value={editingPatientClinic ? editingPatientClinic.clinicId : newPatientClinic.clinicId}
                onChange={(e) =>
                  editingPatientClinic
                    ? setEditingPatientClinic({ ...editingPatientClinic, clinicId: e.target.value as number })
                    : setNewPatientClinic({ ...newPatientClinic, clinicId: e.target.value as number })
                }
              >
                {clinics.map((clinic) => (
                  <MenuItem key={clinic.id} value={clinic.id}>
                    {clinic.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpenDialog(false); setEditingPatientClinic(null); }}>Cancelar</Button>
            <Button onClick={editingPatientClinic ? handleUpdatePatientClinic : handleCreatePatientClinic} color="primary">
              {editingPatientClinic ? 'Salvar' : 'Adicionar'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default PatientClinics;
