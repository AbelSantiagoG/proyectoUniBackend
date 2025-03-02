import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { ProfessorsService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';

@Controller('professors')
export class ProfessorsController {
    constructor(private readonly professorsService: ProfessorsService) {}

    @Get()
    async findAll() {
        return this.professorsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const professor = await this.professorsService.findOne(+id);
        if (!professor) {
        throw new NotFoundException(`Professor with ID ${id} not found`);
        }
        return professor;
    }

    @Post()
    async create(@Body() createProfessorDto: CreateProfessorDto) {
        return this.professorsService.create(createProfessorDto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateProfessorDto: UpdateProfessorDto) {
        return this.professorsService.update(+id, updateProfessorDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.professorsService.remove(+id);
    }
}
