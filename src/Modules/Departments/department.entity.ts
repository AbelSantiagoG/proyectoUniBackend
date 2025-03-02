import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Professor } from '../Professors/professor.entity';

@Entity('departments')
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    name: string;

    @OneToMany(() => Professor, (professor) => professor.department)
    professors: Professor[];
}