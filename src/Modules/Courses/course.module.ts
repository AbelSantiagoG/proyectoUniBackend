import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseService } from './course.service';
import { CoursesController } from './course.controller';
import { Course } from './course.entity';
import { Professor } from '../Professors/professor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Professor])],
  controllers: [CoursesController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CoursesModule {}
