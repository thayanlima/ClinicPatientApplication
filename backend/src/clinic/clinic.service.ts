import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { Repository } from 'typeorm';
import { Clinic } from './entities/clinic.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private readonly repository: Repository<Clinic>,
  ) {}

  /**
   * Cria uma nova clínica.
   * @param dto Dados da clínica a ser criada.
   * @returns A clínica criada.
   */
  async create(dto: CreateClinicDto): Promise<Clinic> {
    const clinic = this.repository.create(dto);
    return this.repository.save(clinic);
  }

  /**
   * Retorna todas as clínicas cadastradas.
   * @returns Uma lista de clínicas.
   */
  async findAll(): Promise<Clinic[]> {
    return this.repository.find();
  }

  /**
   * Retorna uma clínica pelo ID.
   * @param id ID da clínica.
   * @returns A clínica encontrada.
   * @throws NotFoundException Se a clínica não for encontrada.
   */
  async findOne(id: number): Promise<Clinic> {
    const clinic = await this.repository.findOneBy({ id });
    if (!clinic) {
      throw new NotFoundException(`Clínica com ID ${id} não encontrada.`);
    }
    return clinic;
  }

  /**
   * Atualiza uma clínica existente.
   * @param id ID da clínica a ser atualizada.
   * @param dto Dados atualizados da clínica.
   * @returns A clínica atualizada.
   * @throws NotFoundException Se a clínica não for encontrada.
   */
  async update(id: number, dto: UpdateClinicDto): Promise<Clinic> {
    const clinic = await this.repository.findOneBy({ id });
    if (!clinic) {
      throw new NotFoundException(`Clínica com ID ${id} não encontrada.`);
    }
    this.repository.merge(clinic, dto);
    return this.repository.save(clinic);
  }

  /**
   * Remove uma clínica pelo ID.
   * @param id ID da clínica a ser removida.
   * @returns A clínica removida.
   * @throws NotFoundException Se a clínica não for encontrada.
   */
  async remove(id: number): Promise<Clinic> {
    const clinic = await this.repository.findOneBy({ id });
    if (!clinic) {
      throw new NotFoundException(`Clínica com ID ${id} não encontrada.`);
    }
    return this.repository.remove(clinic);
  }
}