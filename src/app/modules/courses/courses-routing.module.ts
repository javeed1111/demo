import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcourseComponent } from './AddCourse/addcourse/addcourse.component';
import { AddtechnologyComponent } from './Addtechnology/addtechnology/addtechnology.component';
import { CourseComponent } from './course/course.component';
import { CourseplanComponent } from './courseplan/courseplan.component';
import { CoursesComponent } from './courses.component';
import { EditcourseComponent } from './EditCourse/editcourse/editcourse.component';
import { EdittechnologyComponent } from './Edittechnology/edittechnology/edittechnology.component';
import { TechnologyComponent } from './technology/technology.component';
import { AddcoursecontentComponent } from './AddCoursecontent/Addcoursecontent.component';
import { CourseContentComponent } from './Coursecontent/course-content/course-content.component';

const routes: Routes = [
  {
    path: '', component: CoursesComponent,
        children: [
            { path: '', redirectTo: 'technology', pathMatch: 'full' },
            { path: 'technology', component: TechnologyComponent },
            { path: 'course', component: CourseComponent },
            { path: 'addcoursecontent/:id/:value', component: AddcoursecontentComponent },
            { path: 'coursecontent', component: CourseContentComponent },
            { path: 'courseplan', component: CourseplanComponent},
            { path: 'addtechnology', component: AddtechnologyComponent },
            { path: 'edittechnology/:id/:value', component: EdittechnologyComponent },
            { path: 'addcourse', component: AddcourseComponent },
            { path: 'editcourse/:id/:value', component: EditcourseComponent },


        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
