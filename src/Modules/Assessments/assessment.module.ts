import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentsService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { Assessment } from './assessment.entity';
import { Course } from '../Courses/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assessment, Course])],
  controllers: [AssessmentController],
  providers: [AssessmentsService],
  exports: [AssessmentsService],
})
export class AssessmentsModule {}
