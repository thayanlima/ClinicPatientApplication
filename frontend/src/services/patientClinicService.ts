import api from './api';

export interface PatientClinic {
  id: number;
  patientId: number;
  clinicId: number;
  patientName: string; // Nome do paciente (você pode incluir o que for necessário)
  clinicName: string; // Nome da clínica (você pode incluir o que for necessário)
}

export const getPatientClinics = async (): Promise<PatientClinic[]> => {
  const response = await api.get('/patient-clinic'); // Correção para garantir que os campos "name" sejam trazidos
  return response.data; // Aqui, a resposta já conterá `patientName` e `clinicName`
};

export const createPatientClinic = async (patientClinic: Omit<PatientClinic, 'id'>): Promise<PatientClinic> => {
  const response = await api.post('/patient-clinic', patientClinic); // Corrigido para /patient-clinic
  return response.data;
};

export const updatePatientClinic = async (id: number, patientClinic: Partial<PatientClinic>): Promise<PatientClinic> => {
  const response = await api.patch(`/patient-clinic/${id}`, patientClinic); // Corrigido para /patient-clinic
  return response.data;
};

export const deletePatientClinic = async (id: number): Promise<void> => {
  await api.delete(`/patient-clinic/${id}`); // Corrigido para /patient-clinic
};
