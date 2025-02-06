import { Test, TestingModule } from '@nestjs/testing';
import { PatientClinicController } from './patient-clinic.controller';
import { PatientClinicService } from './patient-clinic.service';

describe('PatientClinicController', () => {
  let controller: PatientClinicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientClinicController],
      providers: [PatientClinicService],
    }).compile();

    controller = module.get<PatientClinicController>(PatientClinicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
