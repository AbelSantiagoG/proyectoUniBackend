import { IsInt, IsDate } from 'class-validator';

export class CreateEnrollmentDto {
    @IsInt()
    studentId: number;

    @IsInt()
    courseId: number;

    @IsDate()
    enrollmentDate: Date;
}
