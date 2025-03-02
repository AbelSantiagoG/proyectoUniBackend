import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Course } from '../Courses/course.entity';
import { Grade } from '../Grades/grade.entity';

@Entity('assessments')
export class Assessment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.assessments)
  course: Course;

  @Column({ type: 'varchar', length: 100 })
  name: string; 

  @Column({ type: 'date' })
  date: Date;

  @OneToMany(() => Grade, (grade) => grade.assessment)
  grades: Grade[];
}