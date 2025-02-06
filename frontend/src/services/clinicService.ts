import api from './api';

export interface Clinic {
  id: number;
  name: string;
  address: string;
}

export const getClinic = async (): Promise<Clinic[]> => {
  const response = await api.get('/clinic'); // Corrigido para /clinic
  return response.data;
};

export const createClinic = async (clinic: Omit<Clinic, 'id'>): Promise<Clinic> => {
  const response = await api.post('/clinic', clinic); // Corrigido para /clinic
  return response.data;
};

export const updateClinic = async (id: number, clinic: Partial<Clinic>): Promise<Clinic> => {
  const response = await api.patch(`/clinic/${id}`, clinic); // Corrigido para /clinic
  return response.data;
};

export const deleteClinic = async (id: number): Promise<void> => {
  await api.delete(`/clinic/${id}`); // Corrigido para /clinic
};