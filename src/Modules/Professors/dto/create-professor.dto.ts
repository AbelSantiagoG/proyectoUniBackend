import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateProfessorDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDate()
    @IsNotEmpty()
    hireDate: Date;
}
