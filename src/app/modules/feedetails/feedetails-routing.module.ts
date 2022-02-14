import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpaymenttypeComponent } from './addpaymenttype/addpaymenttype.component';
import { FeeDetailsComponent } from './feedetails.component';
import { FeepaymentComponent } from './feepayment/feepayment.component';

const routes: Routes = [
  {
    path:'',component:FeeDetailsComponent,
    children:
    [
      {path:'',redirectTo:'addpaymenttype',pathMatch:'full'},
      {path:'addpaymenttype',component:AddpaymenttypeComponent},
      {path:'feepayment',component:FeepaymentComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedetailsRoutingModule { }
