import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientClinic } from './entities/patient-clinic.entity';
import { UpdatePatientClinicDto } from './dto/update-patient-clinic.dto';
import { Patient } from '../patient/entities/patient.entity';
import { Clinic } from '../clinic/entities/clinic.entity';
import { CreatePatientClinicDto } from './dto/create-patient-clinic.dto';

@Injectable()
export class PatientClinicService {
  constructor(
    @InjectRepository(PatientClinic)
    private readonly patientClinicRepository: Repository<PatientClinic>,

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
  ) {}

  async getAllPatientClinics(): Promise<PatientClinic[]> {
    return this.patientClinicRepository.find({
      relations: ['patient', 'clinic'],  // Certifique-se de carregar as entidades relacionadas
    });
  }
  // Criar novo relacionamento entre paciente e clínica
  async create(dto: CreatePatientClinicDto): Promise<PatientClinic> {
    try {
      const patient = await this.patientRepository.findOne({ where: { id: dto.patientId } });
      const clinic = await this.clinicRepository.findOne({ where: { id: dto.clinicId } });

      if (!patient || !clinic) {
        throw new Error('Paciente ou Clínica não encontrados');
      }

      const patientClinic = this.patientClinicRepository.create({
        patient,
        clinic,
      });

      return this.patientClinicRepository.save(patientClinic);
    } catch (error) {
      throw new Error(`Erro ao criar relacionamento: ${error.message}`);
    }
  }

  // Obter todos os relacionamentos
  async findAll(): Promise<PatientClinic[]> {
    return this.patientClinicRepository.find({
      relations: ['patient', 'clinic'], // Carregar as entidades relacionadas
    });
  }

  // Obter um único relacionamento por ID
  async findOne(id: number): Promise<PatientClinic | null> {
    return this.patientClinicRepository.findOne({
      where: { id },
      relations: ['patient', 'clinic'], // Carregar as entidades relacionadas
    });
  }

  // Atualizar um relacionamento
  async update(id: number, dto: UpdatePatientClinicDto): Promise<PatientClinic | null> {
    const patientClinic = await this.patientClinicRepository.findOne({
      where: { id },
      relations: ['patient', 'clinic'],
    });

    if (!patientClinic) {
      return null;
    }

    try {
      if (dto.patientId) {
        const patient = await this.patientRepository.findOne({ where: { id: dto.patientId } });
        if (patient) {
          patientClinic.patient = patient;
        }
      }

      if (dto.clinicId) {
        const clinic = await this.clinicRepository.findOne({ where: { id: dto.clinicId } });
        if (clinic) {
          patientClinic.clinic = clinic;
        }
      }

      return this.patientClinicRepository.save(patientClinic);
    } catch (error) {
      throw new Error(`Erro ao atualizar relacionamento: ${error.message}`);
    }
  }

  // Remover um relacionamento
  async remove(id: number): Promise<PatientClinic | null> {
    const patientClinic = await this.patientClinicRepository.findOne({
      where: { id },
      relations: ['patient', 'clinic'],
    });

    if (!patientClinic) {
      return null;
    }

    return this.patientClinicRepository.remove(patientClinic);
  }
}
