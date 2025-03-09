import { IsInt, IsDate, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateEnrollmentDto {
    @IsInt()
    studentId: number;

    @IsInt()
    courseId: number;

    @IsDate()
    enrollmentDate: Date;

    @IsOptional() 
    @IsNumber()
    @Min(0) 
    finalGrade?: number;
}
