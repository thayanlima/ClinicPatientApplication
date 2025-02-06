import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Clinic } from 'src/clinic/entities/clinic.entity';
import { Patient } from 'src/patient/entities/patient.entity';

@Entity('patient_clinic')
export class PatientClinic {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Patient, (patient) => patient.patientClinics)
  patient: Patient;

  @ManyToOne(() => Clinic, (clinic) => clinic.patientClinics)
  clinic: Clinic;
}
