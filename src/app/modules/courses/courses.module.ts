import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as moment from 'moment';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { SharedModule } from 'app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';

import { CoursesRoutingModule } from './courses-routing.module';
import { TechnologyComponent } from './technology/technology.component';
import { CourseComponent } from './course/course.component';
import { UpcomingtrainingComponent } from './upcomingtraining/upcomingtraining.component';
import { CourseplanComponent } from './courseplan/courseplan.component';
import { CoursesComponent } from './courses.component';
import { AddtechnologyComponent } from './Addtechnology/addtechnology/addtechnology.component';
import { EdittechnologyComponent } from './Edittechnology/edittechnology/edittechnology.component';
import { AddcourseComponent } from './AddCourse/addcourse/addcourse.component';
import { AutofocusDirective } from './directive/autofocus.directive';
import { EditcourseComponent } from './EditCourse/editcourse/editcourse.component';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    TechnologyComponent,
    CourseComponent,
    UpcomingtrainingComponent,
    CourseplanComponent,
    CoursesComponent,
    AddtechnologyComponent,
    EdittechnologyComponent,
    AddcourseComponent,
    AutofocusDirective,
    EditcourseComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatSortModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTooltipModule,
    MatSlideToggleModule,
    FuseFindByKeyPipeModule,
    MatSortModule,
    MatInputModule,
    MatPaginatorModule,
    SharedModule,
  ]
})
export class CoursesModule { }
