import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentdetailsComponent } from './studentdetails/studentdetails.component';
import { StudentsComponent } from './students.component';
import { StudentstatusComponent } from './studentstatus/studentstatus.component';

const routes: Routes = [
  {
    path:'',component:StudentsComponent,
    children:
    [
      {path:'',redirectTo:'studentstatus',pathMatch:'full'},
      {path:'studentstatus',component:StudentstatusComponent},
      {path:'studentdetails',component:StudentdetailsComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
