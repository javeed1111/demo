import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaywiseenquireComponent } from './daywiseenquire/daywiseenquire.component';
import { ReferencelistComponent } from './referencelist/referencelist.component';
import { ReferralrequestsComponent } from './referralrequests/referralrequests.component';
import { ReportsComponent } from './reports.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { UsersenquiryComponent } from './usersenquiry/usersenquiry.component';
import { UserssubscribedcoursesComponent } from './userssubscribedcourses/userssubscribedcourses.component';

const routes: Routes = [
  {
    path: '', component: ReportsComponent,
    children:
      [
        { path: '', redirectTo: 'referencelist', pathMatch: 'full' },
        { path: 'referencelist', component: ReferencelistComponent },
        { path: 'usersenquiry', component: UsersenquiryComponent },
        { path: 'userssubcourses', component: UserssubscribedcoursesComponent },
        { path: 'daywiseenquire', component: DaywiseenquireComponent },
        { path: 'referralrequests', component: ReferralrequestsComponent },
        {path: 'studentlist', component:StudentDetailsComponent}

      ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
