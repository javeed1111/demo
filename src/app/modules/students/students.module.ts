import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentstatusComponent } from './studentstatus/studentstatus.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';
import { MatIconModule } from '@angular/material/icon';
import { SalesRoutingModule } from '../sales/sales-routing.module';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from 'app/shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatStepperModule } from '@angular/material/stepper';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentstatusComponent,
    StudentdetailsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatIconModule,
    CommonModule,
    SalesRoutingModule,
    MatIconModule,
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
    MatStepperModule,
    
  ]
})
export class StudentsModule { }
