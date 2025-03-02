import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDate()
    @IsNotEmpty()
    birthDate: Date;
}
