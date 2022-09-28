import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcompanydetailsComponent } from './addcompanydetails/addcompanydetails.component';
import { AddconfigurationsComponent } from './addconfigurations/addconfigurations.component';
import { AdddashboardbannerComponent } from './adddashboardbanner/adddashboardbanner.component';
import { CompanydetailsComponent } from './companydetails/companydetails.component';
// import { CompanydetailsComponent } from './companydetails/companydetails.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { DashboardbannerComponent } from './dashboardbanner/dashboardbanner.component';
import { EditcompanydetailsComponent } from './editcompanydetails/editcompanydetails.component';
import { EditconfigurationsComponent } from './editconfigurations/editconfigurations.component';
import { EditdashboardbannerComponent } from './editdashboardbanner/editdashboardbanner.component';
import { MasternavigationComponent } from './masternavigation/masternavigation.component';
import { SalesComponent } from './sales.component';

const routes: Routes = [
  {
    path:'',component:SalesComponent,
    children:
    [
      {path:'',redirectTo:'masternavigation',pathMatch:'full'},

      {path:'dashboardbanner',component:DashboardbannerComponent},
      {path:'adddashboardbanner',component:AdddashboardbannerComponent},
      {path:'editdashboardbanner/:id/:value',component:EditdashboardbannerComponent},
      {path:'configurations',component:ConfigurationsComponent},
      {path:'addconfigurations',component:AddconfigurationsComponent},
      {path:'editconfigurations/:id/:value',component:EditconfigurationsComponent},
      {path:'masternavigation',component:MasternavigationComponent},
      {path:'companydetails',component:CompanydetailsComponent},
      {path:'addcompanydetails',component:AddcompanydetailsComponent},
      {path:'editcompanydetails/:id/:value',component:EditcompanydetailsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
