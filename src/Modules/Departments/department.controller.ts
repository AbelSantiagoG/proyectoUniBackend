import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentController {
    constructor(private readonly departmentsService: DepartmentService) {}

    @Get()
    async findAll() {
        return this.departmentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const department = await this.departmentsService.findOne(+id);
        if (!department) {
        throw new NotFoundException(`Department with ID ${id} not found`);
        }
        return department;
    }

    @Post()
    async create(@Body() createDepartmentDto: CreateDepartmentDto) {
        return this.departmentsService.create(createDepartmentDto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
        return this.departmentsService.update(+id, updateDepartmentDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.departmentsService.remove(+id);
    }
}
