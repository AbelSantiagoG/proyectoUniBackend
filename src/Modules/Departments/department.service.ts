import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>,
    ) {}

    async findAll(): Promise<Department[]> {
        return this.departmentRepository.find();
    }

    async findOne(id: number): Promise<Department> {
        const department = await this.departmentRepository.findOne({ where: { id } });
        if (!department) {
        throw new NotFoundException(`Department with ID ${id} not found`);
        }
        return department;
    }

    async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
        const department = this.departmentRepository.create(createDepartmentDto);
        return this.departmentRepository.save(department);
    }

    async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
        const department = await this.findOne(id);
        Object.assign(department, updateDepartmentDto);
        return this.departmentRepository.save(department);
    }

    async remove(id: number): Promise<void> {
        const department = await this.findOne(id);
        await this.departmentRepository.remove(department);
    }
}
