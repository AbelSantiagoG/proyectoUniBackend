import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assessment } from './assessment.entity';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { Course } from '../Courses/course.entity';

@Injectable()
export class AssessmentsService {
    constructor(
        @InjectRepository(Assessment)
        private readonly assessmentRepository: Repository<Assessment>,
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) {}

    async create(createAssessmentDto: CreateAssessmentDto): Promise<Assessment> {
        const course = await this.courseRepository.findOne({ where: { id: createAssessmentDto.courseId } });
        if (!course) throw new NotFoundException('Curso no encontrado');

        const assessment = this.assessmentRepository.create({ ...createAssessmentDto, course });
        return this.assessmentRepository.save(assessment);
    }

    async findAll(): Promise<Assessment[]> {
        return this.assessmentRepository.find({ relations: ['course'] });
    }

    async findOne(id: number): Promise<Assessment> {
        const assessment = await this.assessmentRepository.findOne({ where: { id }, relations: ['course'] });
        if (!assessment) throw new NotFoundException('Evaluación no encontrada');
        return assessment;
    }

    async update(id: number, updateAssessmentDto: UpdateAssessmentDto): Promise<Assessment> {
        const assessment = await this.findOne(id);
        Object.assign(assessment, updateAssessmentDto);
        return this.assessmentRepository.save(assessment);
    }

    async remove(id: number): Promise<void> {
        const assessment = await this.findOne(id);
        await this.assessmentRepository.remove(assessment);
    }
}
