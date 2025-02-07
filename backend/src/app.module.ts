import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClinicModule } from './clinic/clinic.module';
import { PatientModule } from './patient/patient.module';
import { PatientClinicModule } from './patient-clinic/patient-clinic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres', // Use a variável de ambiente ou o nome do serviço
      port: 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    ClinicModule,
    PatientModule,
    PatientClinicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}