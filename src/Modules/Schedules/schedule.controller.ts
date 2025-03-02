import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { SchedulesService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Controller('schedules')
export class SchedulesController {
    constructor(private readonly schedulesService: SchedulesService) {}

    @Get()
    async findAll() {
        return this.schedulesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.schedulesService.findOne(+id);
    }

    @Post()
    async create(@Body() createScheduleDto: CreateScheduleDto) {
        return this.schedulesService.create(createScheduleDto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
        return this.schedulesService.update(+id, updateScheduleDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.schedulesService.remove(+id);
    }
}
