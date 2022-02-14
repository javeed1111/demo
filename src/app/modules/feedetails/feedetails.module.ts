import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedetailsRoutingModule } from './feedetails-routing.module';
import { FeeDetailsComponent } from './feedetails.component';
import { AddpaymenttypeComponent } from './addpaymenttype/addpaymenttype.component';
import { FeepaymentComponent } from './feepayment/feepayment.component';


@NgModule({
  declarations: [
    FeeDetailsComponent,
    AddpaymenttypeComponent,
    FeepaymentComponent
  ],
  imports: [
    CommonModule,
    FeedetailsRoutingModule
  ]
})
export class FeedetailsModule { }
