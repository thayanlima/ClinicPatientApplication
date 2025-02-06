import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientClinicDto } from './create-patient-clinic.dto';

export class UpdatePatientClinicDto extends PartialType(CreatePatientClinicDto) {}
