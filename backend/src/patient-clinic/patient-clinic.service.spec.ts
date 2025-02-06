import { Test, TestingModule } from '@nestjs/testing';
import { PatientClinicService } from './patient-clinic.service';

describe('PatientClinicService', () => {
  let service: PatientClinicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientClinicService],
    }).compile();

    service = module.get<PatientClinicService>(PatientClinicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
