import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFacultyComponent } from './add-faculty/add-faculty.component';
import { EditfacultyComponent } from './editfaculty/editfaculty.component';
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
      {path:'addfaculty',component:AddFacultyComponent},
      {path:'editfaculty/:id/:value',component:EditfacultyComponent},
      {path:'facultypayment',component:FacultypaymentComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyRoutingModule { }
