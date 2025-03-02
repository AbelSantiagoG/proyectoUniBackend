import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Assessment } from 'src/Modules/Assessments/assessment.entity';
import { Enrollment } from 'src/Modules/Enrollments/enrollment.entity';
import { Schedule } from 'src/Modules/Schedules/schedule.entity';
import { Professor } from 'src/Modules/Professors/professor.entity';

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Professor, (professor) => professor.courses, { onDelete: 'CASCADE' })
    professor: Professor;

    @OneToMany(() => Assessment, (assessment) => assessment.course, { cascade: true })
    assessments: Assessment[];

    @OneToMany(() => Enrollment, (enrollment) => enrollment.course, { cascade: true })
    enrollments: Enrollment[];

    @OneToMany(() => Schedule, (schedule) => schedule.course, { cascade: true })
    schedules: Schedule[];

    @ManyToMany(() => Course)
    @JoinTable({
        name: 'prerequisites', 
        joinColumn: {
        name: 'course_id',
        referencedColumnName: 'id',
        },
        inverseJoinColumn: {
        name: 'prerequisite_id',
        referencedColumnName: 'id',
        },
    })
    prerequisites: Course[];
}
