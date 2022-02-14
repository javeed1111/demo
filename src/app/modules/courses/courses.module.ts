import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { TechnologyComponent } from './technology/technology.component';
import { CourseComponent } from './course/course.component';
import { UpcomingtrainingComponent } from './upcomingtraining/upcomingtraining.component';
import { CourseplanComponent } from './courseplan/courseplan.component';
import { CoursesComponent } from './courses.component';


@NgModule({
  declarations: [
    TechnologyComponent,
    CourseComponent,
    UpcomingtrainingComponent,
    CourseplanComponent,
    CoursesComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule
  ]
})
export class CoursesModule { }
