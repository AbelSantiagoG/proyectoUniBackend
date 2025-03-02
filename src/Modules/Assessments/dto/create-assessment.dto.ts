import { IsString, IsDate, IsNumber } from 'class-validator';

export class CreateAssessmentDto {
    @IsString()
    name: string;

    @IsDate()
    date: Date;

    @IsNumber()
    courseId: number;
}