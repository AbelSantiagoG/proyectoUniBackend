import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentsModule } from './Modules/Assessments/assessment.module';
import { ProfessorsModule } from './Modules/Professors/professor.module';
import { CoursesModule } from './Modules/Courses/course.module';
import { DepartmentsModule } from './Modules/Departments/department.module';
import { SchedulesModule } from './Modules/Schedules/schedule.module';
import { StudentsModule } from './Modules/Students/student.module';
import { ConfigModule } from '@nestjs/config';
import { EnrollmentsModule } from './Modules/Enrollments/enrollment.module';
import { GradesModule } from './Modules/Grades/grade.module';
import { UserModule } from './Modules/Users/user.module';
import { AuthModule } from './Modules/Auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, 
      synchronize: true, 
      retryAttempts: 10, // Más intentos para dar tiempo a MySQL
      retryDelay: 5000,   // Esperar 5 segundos entre intentos
    }),
    AssessmentsModule,
    ProfessorsModule,
    CoursesModule,
    DepartmentsModule,
    SchedulesModule,
    StudentsModule,
    EnrollmentsModule,
    GradesModule,
    UserModule,
    AuthModule
  ],
})
export class AppModule {}

