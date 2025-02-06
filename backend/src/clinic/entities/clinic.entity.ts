import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PatientClinic } from 'src/patient-clinic/entities/patient-clinic.entity'; // Importe a entidade PatientClinic

@Entity('clinic')
export class Clinic {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    address: string;
    @OneToMany(() => PatientClinic, (patientClinic) => patientClinic.clinic)
    patientClinics: PatientClinic[];
}
