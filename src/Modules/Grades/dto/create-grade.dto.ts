import { IsNumber, IsPositive } from 'class-validator';

export class CreateGradeDto {
    @IsNumber()
    @IsPositive()
    score: number;

    @IsNumber()
    studentId: number;

    @IsNumber()
    assessmentId: number;
}