import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulesService } from './schedule.service';
import { SchedulesController } from './schedule.controller';
import { Schedule } from './schedule.entity';
import { Course } from '../Courses/course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Course])],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
