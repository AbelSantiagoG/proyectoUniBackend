import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Course } from '../Courses/course.entity';

@Injectable()
export class SchedulesService {
    constructor(
        @InjectRepository(Schedule)
        private readonly scheduleRepository: Repository<Schedule>,
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
    ) {}

    async findAll(): Promise<Schedule[]> {
        return this.scheduleRepository.find({ relations: ['course'] });
    }

    async findOne(id: number): Promise<Schedule> {
        const schedule = await this.scheduleRepository.findOne({
        where: { id },
        relations: ['course'],
        });
        if (!schedule) {
        throw new NotFoundException(`Schedule with ID ${id} not found`);
        }
        return schedule;
    }

    async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
        const course = await this.courseRepository.findOne({ where: { id: createScheduleDto.courseId } });
        if (!course) {
        throw new NotFoundException(`Course with ID ${createScheduleDto.courseId} not found`);
        }

        const schedule = this.scheduleRepository.create({
        ...createScheduleDto,
        course,
        });
        return this.scheduleRepository.save(schedule);
    }

    async update(id: number, updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
        const schedule = await this.findOne(id);
        Object.assign(schedule, updateScheduleDto);
        return this.scheduleRepository.save(schedule);
    }

    async remove(id: number): Promise<void> {
        const schedule = await this.findOne(id);
        await this.scheduleRepository.remove(schedule);
    }
}
