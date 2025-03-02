import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Enrollment } from '../Enrollments/enrollment.entity';
import { Grade } from '../Grades/grade.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  studentId: string; 

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];

  @OneToMany(() => Grade, (grade) => grade.student)
  grades: Grade[];
}
