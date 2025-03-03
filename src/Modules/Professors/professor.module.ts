import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorsService } from './professor.service';
import { ProfessorsController } from './professor.controller';
import { Professor } from './professor.entity';
import { Department } from '../Departments/department.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Professor, Department])],
    controllers: [ProfessorsController],
    providers: [ProfessorsService],
    exports: [ProfessorsService],
})
export class ProfessorsModule {}
