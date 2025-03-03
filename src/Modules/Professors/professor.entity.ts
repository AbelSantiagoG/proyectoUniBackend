import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Department } from '../Departments/department.entity';
import { Course } from '../Courses/course.entity';

@Entity('professors')
export class Professor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'date' })
    hireDate: Date;

    @ManyToOne(() => Department, (department) => department.professors, { onDelete: 'CASCADE' })
    department: Department;

    @OneToMany(() => Course, (course) => course.professor)
    courses: Course[];
}