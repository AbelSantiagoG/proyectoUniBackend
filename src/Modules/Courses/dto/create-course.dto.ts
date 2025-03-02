import { IsString, IsOptional, IsInt, IsArray } from 'class-validator';

export class CreateCourseDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsInt()
    professorId: number;

    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    prerequisiteIds?: number[];
}
