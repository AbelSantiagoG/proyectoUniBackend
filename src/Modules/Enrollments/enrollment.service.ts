import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Student } from '../Students/student.entity';
import { Course } from '../Courses/course.entity';

@Injectable()
export class EnrollmentsService {
    constructor(
        @InjectRepository(Enrollment)
        private readonly enrollmentRepository: Repository<Enrollment>,
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,  

        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,   
    ) {}

    async create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
        const { studentId, courseId, enrollmentDate } = createEnrollmentDto;
    
        const student = await this.studentRepository.findOne({ where: { id: studentId } });
        const course = await this.courseRepository.findOne({ where: { id: courseId } });
    
        if (!student || !course) {
            throw new Error('Student or Course not found');
        }
    
        const enrollment = this.enrollmentRepository.create({
            student,
            course,
            enrollmentDate,
        });
    
        return this.enrollmentRepository.save(enrollment);
    }

    async findAll(): Promise<Enrollment[]> {
        return this.enrollmentRepository.find();
    }

    async findOne(id: number): Promise<Enrollment> {
        const enrollment = await this.enrollmentRepository.findOne({
            where: { id },
            relations: ['student', 'course'],
        });
        
        if (!enrollment) {
            throw new Error(`Enrollment with ID ${id} not found`);
        }
        
        return enrollment;
    }

    async update(id: number, updateEnrollmentDto: UpdateEnrollmentDto): Promise<Enrollment> {
        await this.enrollmentRepository.update(id, {
            student: { id: updateEnrollmentDto.studentId },
            course: { id: updateEnrollmentDto.courseId },
            enrollmentDate: updateEnrollmentDto.enrollmentDate
        });
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.enrollmentRepository.delete(id);
    }
}
