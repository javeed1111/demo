import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnquiryfollowupComponent } from './enquiryfollowup/enquiryfollowup.component';
import { EnquirymanagementComponent } from './enquirymanagement/enquirymanagement.component';
import { EnquiryMgmtComponent } from './enquirymgmt.component';

const routes: Routes = [
  {
    path:'',component:EnquiryMgmtComponent,
    children:
    [
      {path:'',redirectTo:'enquirymanagement',pathMatch:'full'},
      {path:'enquirymanagement',component:EnquirymanagementComponent},
      {path:'enquirefollowup',component:EnquiryfollowupComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnquirymanagementRoutingModule { }
