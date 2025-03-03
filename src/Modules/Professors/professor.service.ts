import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from './professor.entity';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Department } from '../Departments/department.entity';

@Injectable()
export class ProfessorsService {
    constructor(
        @InjectRepository(Professor)
        private readonly professorRepository: Repository<Professor>,
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department> 
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
        const { name, hireDate, departmentId } = createProfessorDto;
    
        const department = await this.departmentRepository.findOne({
            where: { id: departmentId },
        });
    
        if (!department) {
            throw new Error('Department not found');
        }
    
        const professor = this.professorRepository.create({
            name,
            hireDate,
            department,
        });
    
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
