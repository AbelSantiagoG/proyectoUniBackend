import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AssessmentsService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';

@Controller('assessments')
export class AssessmentController {
    constructor(private readonly assessmentsService: AssessmentsService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() createAssessmentDto: CreateAssessmentDto) {
        return this.assessmentsService.create(createAssessmentDto);
    }

    @Get()
    findAll() {
        return this.assessmentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.assessmentsService.findOne(+id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAssessmentDto: UpdateAssessmentDto) {
        return this.assessmentsService.update(+id, updateAssessmentDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.assessmentsService.remove(+id);
    }
}
