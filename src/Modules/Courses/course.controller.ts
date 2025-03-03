import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesService: CourseService) {}

    @Get()
    async findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const course = await this.coursesService.findOne(+id);
        if (!course) {
            throw new NotFoundException(`Course with ID ${id} not found`);
        }
        return course;
    }

    @Post()
    async create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.coursesService.update(+id, updateCourseDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.coursesService.remove(+id);
    }

    @Get(':id/prerequisites')
    async getPrerequisites(@Param('id') id: string) {
        return this.coursesService.getPrerequisites(+id);
    }

    @Patch(':id/prerequisites')
    async updatePrerequisites(@Param('id') id: string, @Body('prerequisiteIds') prerequisiteIds: number[]) {
        return this.coursesService.updatePrerequisites(+id, prerequisiteIds);
    }
}
