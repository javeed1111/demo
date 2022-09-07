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
import { CourseplanlistComponent } from './courseplanlist/courseplanlist.component';
import { CourseplaneditComponent } from './courseplanedit/courseplanedit.component';
import { CourseModuleComponent } from './course-module/course-module.component';
import { AddCourseModuleComponent } from './add-course-module/add-course-module.component';
import { EditCourseModuleComponent } from './edit-course-module/edit-course-module.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  {
    path: '', component: CoursesComponent,
        children: [
            { path: '', redirectTo: 'technology', pathMatch: 'full' },
            { path: 'technology', component: TechnologyComponent },
            { path: 'course', component: CourseComponent },
            { path: 'reviews/:id', component: ReviewsComponent },
            { path: 'questions/:id', component: QuestionsComponent },
            { path: 'subscriptions/:id', component: SubscriptionsComponent },
            // { path: 'addcoursecontent/:courseid/:moduleid/:value', component: AddcoursecontentComponent },
            { path: 'addcoursecontent/:courseid/:value', component: AddcoursecontentComponent },
            { path: 'coursecontent', component: CourseContentComponent },
            { path: 'courseplanlist', component: CourseplanlistComponent},
            { path: 'editcourseplan/:pcid/:planid/:value', component: CourseplaneditComponent},
            { path: 'courseplan', component: CourseplanComponent},
            { path: 'addtechnology', component: AddtechnologyComponent },
            { path: 'edittechnology/:id/:value', component: EdittechnologyComponent },
            { path: 'addcourse', component: AddcourseComponent },
            { path: 'editcourse/:id/:value', component: EditcourseComponent },
            { path: 'coursemodule/:id', component: CourseModuleComponent },
            { path: 'addcoursemodule/:id', component: AddCourseModuleComponent },
            { path: 'editcoursemodule/:courseid/:id/:value', component: EditCourseModuleComponent },

        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
