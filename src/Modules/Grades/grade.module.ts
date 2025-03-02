import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradesService } from './grade.service';
import { GradesController } from './grade.controller';
import { Grade } from './grade.entity';
import { Student } from '../Students/student.entity';
import { Assessment } from '../Assessments/assessment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Student, Assessment])],
  controllers: [GradesController],
  providers: [GradesService],
  exports: [GradesService],
})
export class GradesModule {}
