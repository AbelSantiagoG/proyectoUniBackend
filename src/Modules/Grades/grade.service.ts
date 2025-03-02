import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './grade.entity';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Student } from '../Students/student.entity';
import { Assessment } from '../Assessments/assessment.entity';

@Injectable()
export class GradesService {
    constructor(
        @InjectRepository(Grade)
        private readonly gradeRepository: Repository<Grade>,
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
        @InjectRepository(Assessment)
        private readonly assessmentRepository: Repository<Assessment>,
    ) {}

    async create(createGradeDto: CreateGradeDto): Promise<Grade> {
        const student = await this.studentRepository.findOne({ where: { id: createGradeDto.studentId } });
        if (!student) throw new NotFoundException('Estudiante no encontrado');

        const assessment = await this.assessmentRepository.findOne({ where: { id: createGradeDto.assessmentId } });
        if (!assessment) throw new NotFoundException('Evaluación no encontrada');

        const grade = this.gradeRepository.create({ ...createGradeDto, student, assessment });
        return this.gradeRepository.save(grade);
    }

    async findAll(): Promise<Grade[]> {
        return this.gradeRepository.find({ relations: ['student', 'assessment'] });
    }

    async findOne(id: number): Promise<Grade> {
        const grade = await this.gradeRepository.findOne({ where: { id }, relations: ['student', 'assessment'] });
        if (!grade) throw new NotFoundException('Calificación no encontrada');
        return grade;
    }

    async update(id: number, updateGradeDto: UpdateGradeDto): Promise<Grade> {
        const grade = await this.findOne(id);
        Object.assign(grade, updateGradeDto);
        return this.gradeRepository.save(grade);
    }

    async remove(id: number): Promise<void> {
        const grade = await this.findOne(id);
        await this.gradeRepository.remove(grade);
    }
}
