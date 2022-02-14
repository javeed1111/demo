import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyRoutingModule } from './faculty-routing.module';
import { FacultyComponent } from './faculty.component';
import { FacultydetailsComponent } from './facultydetails/facultydetails.component';
import { FacultypaymentComponent } from './facultypayment/facultypayment.component';


@NgModule({
  declarations: [
    FacultyComponent,
    FacultydetailsComponent,
    FacultypaymentComponent
  ],
  imports: [
    CommonModule,
    FacultyRoutingModule
  ]
})
export class FacultyModule { }
