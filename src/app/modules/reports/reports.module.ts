import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReferencelistComponent } from './referencelist/referencelist.component';
import { UsersenquiryComponent } from './usersenquiry/usersenquiry.component';
import { UserssubscribedcoursesComponent } from './userssubscribedcourses/userssubscribedcourses.component';
import { DaywiseenquireComponent } from './daywiseenquire/daywiseenquire.component';
import { ReferralrequestsComponent } from './referralrequests/referralrequests.component';


@NgModule({
  declarations: [
    ReportsComponent,
    ReferencelistComponent,
    UsersenquiryComponent,
    UserssubscribedcoursesComponent,
    DaywiseenquireComponent,
    ReferralrequestsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
