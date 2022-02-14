import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchesRoutingModule } from './batches-routing.module';
import { BatchesComponent } from './batches.component';
import { BatchdetailsComponent } from './batchdetails/batchdetails.component';
import { BatchstatusComponent } from './batchstatus/batchstatus.component';


@NgModule({
  declarations: [
    BatchesComponent,
    BatchdetailsComponent,
    BatchstatusComponent
  ],
  imports: [
    CommonModule,
    BatchesRoutingModule
  ]
})
export class BatchesModule { }
