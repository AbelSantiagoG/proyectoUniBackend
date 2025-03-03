import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class CreateProfessorDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDate()
    @IsNotEmpty()
    hireDate: Date;

    @IsNumber()
    @IsNotEmpty()
    departmentId: number;  
}