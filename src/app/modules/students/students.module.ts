import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentstatusComponent } from './studentstatus/studentstatus.component';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentstatusComponent,
    StudentdetailsComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }
