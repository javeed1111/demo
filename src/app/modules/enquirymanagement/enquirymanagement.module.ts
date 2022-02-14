import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnquirymanagementRoutingModule } from './enquirymanagement-routing.module';
import { EnquiryMgmtComponent } from './enquirymgmt.component';
import { EnquirymanagementComponent } from './enquirymanagement/enquirymanagement.component';
import { EnquiryfollowupComponent } from './enquiryfollowup/enquiryfollowup.component';


@NgModule({
  declarations: [
    EnquiryMgmtComponent,
    EnquirymanagementComponent,
    EnquiryfollowupComponent
  ],
  imports: [
    CommonModule,
    EnquirymanagementRoutingModule
  ]
})
export class EnquirymanagementModule { }
