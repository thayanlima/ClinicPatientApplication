import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly repository: Repository<Patient>){}
  
  create(dto: CreatePatientDto) {
    const patient = this.repository.create(dto)
    return this.repository.save(patient)
  }
  
    findAll() {
      return this.repository.find();
    }
  
    findOne(id: number) {
      return this.repository.findOneBy({id});
    }
  
    async update(id: number, dto: UpdatePatientDto) {
      const patient = await this.repository.findOneBy({id});
      if(!patient) return null;
      this.repository.merge(patient, dto);
      return this.repository.save(patient);
    }
  
    async remove(id: number) {
      const patient = await this.repository.findOneBy({id});
      if(!patient) return null;
      return this.repository.remove(patient);
    }
}