import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CourseplanComponent } from './courseplan/courseplan.component';
import { CoursesComponent } from './courses.component';
import { TechnologyComponent } from './technology/technology.component';
import { UpcomingtrainingComponent } from './upcomingtraining/upcomingtraining.component';

const routes: Routes = [
  {
    path: '', component: CoursesComponent,
        children: [
            { path: '', redirectTo: 'technology', pathMatch: 'full' },
            { path: 'technology', component: TechnologyComponent },
            { path: 'course', component: CourseComponent },
            { path: 'upcomingtraining', component: UpcomingtrainingComponent },
            { path: 'courseplan', component: CourseplanComponent},

        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
