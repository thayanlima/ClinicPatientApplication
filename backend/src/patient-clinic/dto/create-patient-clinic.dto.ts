import { IsNumber } from 'class-validator';

export class CreatePatientClinicDto {
    @IsNumber()
    patientId?: number;
    @IsNumber()
    clinicId?: number;
}
