import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateScheduleDto {
    @IsString()
    @IsNotEmpty()
    day: string; 

    @IsDateString()
    @IsNotEmpty()
    startTime: string; 

    @IsDateString()
    @IsNotEmpty()
    endTime: string; 

    @IsNotEmpty()
    courseId: number; 
}
