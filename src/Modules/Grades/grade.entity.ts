import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../Students/student.entity';
import { Assessment } from '../Assessments/assessment.entity';

@Entity('grades')
export class Grade {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 5, scale: 2 }) 
    score: number;

    @ManyToOne(() => Student, (student) => student.grades)
    student: Student;

    @ManyToOne(() => Assessment, (assessment) => assessment.grades)
    assessment: Assessment;
}
