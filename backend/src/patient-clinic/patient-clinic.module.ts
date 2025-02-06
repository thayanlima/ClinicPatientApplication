import { Module } from '@nestjs/common';
import { PatientClinicService } from './patient-clinic.service';
import { PatientClinicController } from './patient-clinic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientClinic } from './entities/patient-clinic.entity';
import { PatientModule } from '../patient/patient.module'; // Importe o PatientModule
import { ClinicModule } from '../clinic/clinic.module'; // Importe o ClinicModule
import { Clinic } from 'src/clinic/entities/clinic.entity';
@Module({
  imports: [TypeOrmModule.forFeature([PatientClinic, Clinic]),
  PatientModule,
  ClinicModule],
  controllers: [PatientClinicController],
  providers: [PatientClinicService],
})
export class PatientClinicModule {}
