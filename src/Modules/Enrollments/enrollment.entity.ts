import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Unique, JoinColumn } from 'typeorm';
import { Student } from '../Students/student.entity';
import { Course } from '../Courses/course.entity';

@Entity('enrollments')
@Unique(['student', 'course']) 
export class Enrollment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, (student) => student.enrollments, { 
        eager: true, 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
    }) 
    @JoinColumn({ name: 'studentId' })  
    student: Student;

    @ManyToOne(() => Course, (course) => course.enrollments, { 
        eager: true, 
        onDelete: 'CASCADE', 
        onUpdate: 'CASCADE'
    }) 
    @JoinColumn({ name: 'courseId' }) 
    course: Course;

    @Column({ type: 'date', nullable: false })
    enrollmentDate: Date;

    @Column({ type: 'float', nullable: true })
    finalGrade?: number; 
}