import api from './api';

export interface Patient {
  id: number;
  name: string;
  age: number;
}

export const getPatients = async (): Promise<Patient[]> => {
  const response = await api.get('/patient'); // Corrigido para /patient
  return response.data;
};

export const createPatient = async (patient: Omit<Patient, 'id'>): Promise<Patient> => {
  const response = await api.post('/patient', patient); // Corrigido para /patient
  return response.data;
};

export const updatePatient = async (id: number, patient: Partial<Patient>): Promise<Patient> => {
  const response = await api.patch(`/patient/${id}`, patient); // Corrigido para /patient
  return response.data;
};

export const deletePatient = async (id: number): Promise<void> => {
  await api.delete(`/patient/${id}`); // Corrigido para /patient
};