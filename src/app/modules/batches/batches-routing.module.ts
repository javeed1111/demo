import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchdetailsComponent } from './batchdetails/batchdetails.component';
import { BatchesComponent } from './batches.component';
import { BatchstatusComponent } from './batchstatus/batchstatus.component';

const routes: Routes = [
  {
    path:'',component:BatchesComponent,
    children:
    [
      {path:'',redirectTo:'batchdetails',pathMatch:'full'},
      {path:'batchdetails',component:BatchdetailsComponent},
      {path:'batchstatus',component:BatchstatusComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchesRoutingModule { }
