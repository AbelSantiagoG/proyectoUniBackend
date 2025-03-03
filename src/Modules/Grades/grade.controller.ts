import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GradesService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Controller('grades')
export class GradesController {
    constructor(private readonly gradesService: GradesService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createGradeDto: CreateGradeDto) {
        return this.gradesService.create(createGradeDto);
    }

    @Get()
    findAll() {
        return this.gradesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.gradesService.findOne(+id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
        return this.gradesService.update(+id, updateGradeDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.gradesService.remove(+id);
    }
}
