import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyRoutingModule } from './faculty-routing.module';
import { FacultyComponent } from './faculty.component';
import { FacultydetailsComponent } from './facultydetails/facultydetails.component';
import { FacultypaymentComponent } from './facultypayment/facultypayment.component';
import { AddFacultyComponent } from './add-faculty/add-faculty.component';
import { EditfacultyComponent } from './editfaculty/editfaculty.component';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { QuillModule } from 'ngx-quill';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatStepperModule } from '@angular/material/stepper';
import { MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipsModule } from '@angular/material/chips';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';


@NgModule({
  declarations: [
    FacultyComponent,
    FacultydetailsComponent,
    FacultypaymentComponent,
    AddFacultyComponent,
    EditfacultyComponent
  ],
  imports: [
    CommonModule,
    FacultyRoutingModule,
    MatSortModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
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
    QuillModule,
    FuseAlertModule,
    MatStepperModule
  ]
})
export class FacultyModule { }
