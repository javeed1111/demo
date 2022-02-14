import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnquirystatusComponent } from './enquirystatus/enquirystatus.component';
import { EnquirytypeComponent } from './enquirytype/enquirytype.component';
import { LearningmodeComponent } from './learningmode/learningmode.component';
import { MastersComponent } from './masters.component';

const routes: Routes = [
  {
    path:'',component:MastersComponent,
    children:
    [
      {path:'',redirectTo:'enquirystatus',pathMatch:'full'},
      {path:'enquirystatus',component:EnquirystatusComponent},
      {path:'enquirytype',component:EnquirytypeComponent},
      {path:'learningmode',component:LearningmodeComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
