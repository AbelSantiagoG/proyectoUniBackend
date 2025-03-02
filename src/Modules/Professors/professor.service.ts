import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from './professor.entity';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Injectable()
export class ProfessorsService {
    constructor(
        @InjectRepository(Professor)
        private readonly professorRepository: Repository<Professor>,
    ) {}

    async findAll(): Promise<Professor[]> {
        return this.professorRepository.find();
    }

    async findOne(id: number): Promise<Professor> {
        const professor = await this.professorRepository.findOne({ where: { id } });
        if (!professor) {
        throw new NotFoundException(`Professor with ID ${id} not found`);
        }
        return professor;
    }

    async create(createProfessorDto: CreateProfessorDto): Promise<Professor> {
        const professor = this.professorRepository.create(createProfessorDto);
        return this.professorRepository.save(professor);
    }

    async update(id: number, updateProfessorDto: UpdateProfessorDto): Promise<Professor> {
        const professor = await this.findOne(id);
        Object.assign(professor, updateProfessorDto);
        return this.professorRepository.save(professor);
    }

    async remove(id: number): Promise<void> {
        const professor = await this.findOne(id);
        await this.professorRepository.remove(professor);
    }
}
