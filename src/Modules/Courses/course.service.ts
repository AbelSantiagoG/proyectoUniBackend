import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { Professor } from '../Professors/professor.entity';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,

        @InjectRepository(Professor)
        private readonly professorRepository: Repository<Professor>,
    ) {}

    async create(createCourseDto: CreateCourseDto): Promise<Course> {
        const { name, description, professorId, prerequisiteIds } = createCourseDto;
    
        const professor = await this.professorRepository.findOne({ where: { id: professorId } });
        if (!professor) {
            throw new NotFoundException(`Professor with id ${professorId} not found`);
        }
    
        let prerequisites: Course[] = [];
        if (prerequisiteIds && prerequisiteIds.length > 0) {
            prerequisites = await this.courseRepository.findByIds(prerequisiteIds);
        }
    
        const course = this.courseRepository.create({
            name,
            description,
            professor,
            prerequisites
        });
    
        return await this.courseRepository.save(course);
    }
    

    async findAll(): Promise<Course[]> {
        return await this.courseRepository.find({ relations: ['professor', 'prerequisites'] });
    }

    async findOne(id: number): Promise<Course> {
        const course = await this.courseRepository.findOne({
            where: { id },
            relations: ['professor', 'prerequisites', 'enrollments', 'enrollments.student'],
        });
        if (!course) {
            throw new NotFoundException(`Course with id ${id} not found`);
        }
        return course;
    }

    async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
        const { prerequisiteIds, ...rest } = updateCourseDto;
    
        const course = await this.courseRepository.findOne({ where: { id }, relations: ['prerequisites'] });
        if (!course) {
            throw new NotFoundException(`Course with ID ${id} not found`);
        }
    
        if (prerequisiteIds) {
            const prerequisites = await this.courseRepository.findByIds(prerequisiteIds);
            course.prerequisites = prerequisites;
        }
    
        Object.assign(course, rest);
        return this.courseRepository.save(course);
    }
    

    async remove(id: number): Promise<void> {
        const result = await this.courseRepository.delete(id);

        if (result.affected === 0) {
        throw new NotFoundException(`Course with ID ${id} not found`);
        }
    }

    async getPrerequisites(courseId: number): Promise<Course[]> {
        const course = await this.courseRepository.findOne({
            where: { id: courseId },
            relations: ['prerequisites'],
        });
    
        if (!course) {
            throw new NotFoundException(`Course with ID ${courseId} not found`);
        }
    
        return course.prerequisites;
    }
    
    async updatePrerequisites(courseId: number, prerequisiteIds: number[]): Promise<Course> {
        const course = await this.courseRepository.findOne({
            where: { id: courseId },
            relations: ['prerequisites'],
        });
    
        if (!course) {
            throw new NotFoundException(`Course with ID ${courseId} not found`);
        }
    
        const prerequisites = await this.courseRepository.findByIds(prerequisiteIds);
        course.prerequisites = prerequisites;
    
        return await this.courseRepository.save(course);
    }
    
}
