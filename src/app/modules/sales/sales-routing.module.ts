import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddconfigurationsComponent } from './addconfigurations/addconfigurations.component';
import { AdddashboardbannerComponent } from './adddashboardbanner/adddashboardbanner.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { DashboardbannerComponent } from './dashboardbanner/dashboardbanner.component';
import { EditconfigurationsComponent } from './editconfigurations/editconfigurations.component';
import { EditdashboardbannerComponent } from './editdashboardbanner/editdashboardbanner.component';
import { SalesComponent } from './sales.component';

const routes: Routes = [
  {
    path:'',component:SalesComponent,
    children:
    [
      {path:'',redirectTo:'configurations',pathMatch:'full'},
      {path:'dashboardbanner',component:DashboardbannerComponent},
      {path:'adddashboardbanner',component:AdddashboardbannerComponent},
      {path:'editdashboardbanner/:id/:value',component:EditdashboardbannerComponent},
      {path:'configurations',component:ConfigurationsComponent},
      {path:'addconfigurations',component:AddconfigurationsComponent},
      {path:'editconfigurations/:id/:value',component:EditconfigurationsComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
