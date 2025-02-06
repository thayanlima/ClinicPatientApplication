import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PatientClinic } from 'src/patient-clinic/entities/patient-clinic.entity'; // Importe a entidade PatientClinic

@Entity('patient')
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    age: number;
    @OneToMany(() => PatientClinic, (patientClinic) => patientClinic.patient)
    patientClinics: PatientClinic[];
}
