import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReferencelistComponent } from './referencelist/referencelist.component';
import { UsersenquiryComponent } from './usersenquiry/usersenquiry.component';
import { UserssubscribedcoursesComponent } from './userssubscribedcourses/userssubscribedcourses.component';
import { DaywiseenquireComponent } from './daywiseenquire/daywiseenquire.component';
import { ReferralrequestsComponent } from './referralrequests/referralrequests.component';
import { StudentDetailsComponent } from './student-details/student-details.component';


@NgModule({
  declarations: [
    ReportsComponent,
    ReferencelistComponent,
    UsersenquiryComponent,
    UserssubscribedcoursesComponent,
    DaywiseenquireComponent,
    ReferralrequestsComponent,
    StudentDetailsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
