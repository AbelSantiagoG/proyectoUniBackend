import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsService } from './enrollment.service';
import { EnrollmentsController } from './enrollment.controller';
import { Enrollment } from './enrollment.entity';
import { Student } from '../Students/student.entity';
import { Course } from '../Courses/course.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Enrollment, Student, Course])],
    controllers: [EnrollmentsController],
    providers: [EnrollmentsService],
})
export class EnrollmentsModule {}
