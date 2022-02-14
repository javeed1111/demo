import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultyComponent } from './faculty.component';
import { FacultydetailsComponent } from './facultydetails/facultydetails.component';
import { FacultypaymentComponent } from './facultypayment/facultypayment.component';

const routes: Routes = [
  {
    path:'',component:FacultyComponent,
    children:
    [
      {path:'',redirectTo:'facultydetails',pathMatch:'full'},
      {path:'facultydetails',component:FacultydetailsComponent},
      {path:'facultypayment',component:FacultypaymentComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyRoutingModule { }
