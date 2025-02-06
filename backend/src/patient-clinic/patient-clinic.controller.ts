import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientClinicService } from './patient-clinic.service';
import { CreatePatientClinicDto } from './dto/create-patient-clinic.dto';
import { UpdatePatientClinicDto } from './dto/update-patient-clinic.dto';
import { PatientClinic } from './entities/patient-clinic.entity';

@Controller('patient-clinic')
export class PatientClinicController {
  constructor(private readonly patientClinicService: PatientClinicService) {}

  @Post()
  create(@Body() createPatientClinicDto: CreatePatientClinicDto) {
    return this.patientClinicService.create(createPatientClinicDto);
  }

  @Get()
  async findAll(): Promise<PatientClinic[]> {
    const patientClinics = await this.patientClinicService.findAll();
    
    return patientClinics.map((patientClinic) => ({
      ...patientClinic,
      patientName: patientClinic.patient.name,
      clinicName: patientClinic.clinic.name,
    }));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientClinicService.findOne(+id);
  }

  @Get()
  async getPatientClinics(): Promise<PatientClinic[]> {
    const patientClinics = await this.patientClinicService.getAllPatientClinics();
    
    return patientClinics.map((patientClinic) => ({
      ...patientClinic,
      patientName: patientClinic.patient.name,
      clinicName: patientClinic.clinic.name,
    }));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientClinicDto: UpdatePatientClinicDto) {
    return this.patientClinicService.update(+id, updatePatientClinicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientClinicService.remove(+id);
  }
}
