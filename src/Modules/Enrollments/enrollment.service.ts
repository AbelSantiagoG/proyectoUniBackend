import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from './enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentsService {
    constructor(
        @InjectRepository(Enrollment)
        private readonly enrollmentRepository: Repository<Enrollment>,
    ) {}

    async create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
        const enrollment = this.enrollmentRepository.create(createEnrollmentDto);
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
        await this.enrollmentRepository.update(id, updateEnrollmentDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.enrollmentRepository.delete(id);
    }
}
