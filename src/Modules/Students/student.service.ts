import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(Student)
        private readonly studentRepository: Repository<Student>,
    ) {}

    async create(createStudentDto: CreateStudentDto): Promise<Student> {
        const student = this.studentRepository.create(createStudentDto);
        return this.studentRepository.save(student);
    }

    async findAll(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    

    async findOne(id: number): Promise<Student> {
        const student = await this.studentRepository.findOne({
            where: { id },
            relations: ['enrollments', 'enrollments.course'],
        });

        if (!student) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }

        return student;
    }


    async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
        await this.studentRepository.update(id, updateStudentDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const student = await this.findOne(id);
        await this.studentRepository.remove(student);
    }
}
