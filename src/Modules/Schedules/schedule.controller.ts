import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() createScheduleDto: CreateScheduleDto) {
        return this.schedulesService.create(createScheduleDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
        return this.schedulesService.update(+id, updateScheduleDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.schedulesService.remove(+id);
    }
}
