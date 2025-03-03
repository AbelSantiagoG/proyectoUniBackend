import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EnrollmentsService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Controller('enrollments')
export class EnrollmentsController {
    constructor(private readonly enrollmentsService: EnrollmentsService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
        return this.enrollmentsService.create(createEnrollmentDto);
    }

    @Get()
    findAll() {
        return this.enrollmentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.enrollmentsService.findOne(+id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
        return this.enrollmentsService.update(+id, updateEnrollmentDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.enrollmentsService.remove(+id);
    }
}
