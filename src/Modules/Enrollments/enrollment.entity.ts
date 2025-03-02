import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Unique } from 'typeorm';
import { Student } from '../Students/student.entity';
import { Course } from '../Courses/course.entity';

@Entity('enrollments')
@Unique(['student', 'course']) 
export class Enrollment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, (student) => student.enrollments)
    student: Student;

    @ManyToOne(() => Course, (course) => course.enrollments)
    course: Course;

    @Column({ type: 'date' })
    enrollmentDate: Date;

    @Column({ type: 'float', nullable: true })
    finalGrade?: number; 
}