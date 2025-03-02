import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private coursesRepository: Repository<Course>,
    ) {}

    findAll(): Promise<Course[]> {
        return this.coursesRepository.find({ relations: ['professor', 'prerequisites', 'schedules'] });
    }

    async findOne(id: number): Promise<Course> {
        const course = await this.coursesRepository.findOne({ where: { id }, relations: ['professor', 'prerequisites', 'schedules'] });
        
        if (!course) {
        throw new NotFoundException(`Course with ID ${id} not found`);
        }
        
        return course;
    }

    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        const course = this.coursesRepository.create(createCourseDto);
        return this.coursesRepository.save(course);
    }

    async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
        const course = await this.coursesRepository.preload({ id, ...updateCourseDto });

        if (!course) {
        throw new NotFoundException(`Course with ID ${id} not found`);
        }

        return this.coursesRepository.save(course);
    }

    async remove(id: number): Promise<void> {
        const result = await this.coursesRepository.delete(id);

        if (result.affected === 0) {
        throw new NotFoundException(`Course with ID ${id} not found`);
        }
    }
}
