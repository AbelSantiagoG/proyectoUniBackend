import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() createProfessorDto: CreateProfessorDto) {
        return this.professorsService.create(createProfessorDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateProfessorDto: UpdateProfessorDto) {
        return this.professorsService.update(+id, updateProfessorDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.professorsService.remove(+id);
    }
}
