import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcompanydetailsComponent } from './addcompanydetails/addcompanydetails.component';
import { AddconfigurationsComponent } from './addconfigurations/addconfigurations.component';
import { AdddashboardbannerComponent } from './adddashboardbanner/adddashboardbanner.component';
import { CompanydetailsComponent } from './companydetails/companydetails.component';
// import { CompanydetailsComponent } from './companydetails/companydetails.component';
import { AddtermsandpolicyComponent } from './addtermsandpolicy/addtermsandpolicy.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { DashboardbannerComponent } from './dashboardbanner/dashboardbanner.component';
import { EditcompanydetailsComponent } from './editcompanydetails/editcompanydetails.component';
import { EditconfigurationsComponent } from './editconfigurations/editconfigurations.component';
import { EditdashboardbannerComponent } from './editdashboardbanner/editdashboardbanner.component';
import { EdittermsandpolicyComponent } from './edittermsandpolicy/edittermsandpolicy.component';
import { MasternavigationComponent } from './masternavigation/masternavigation.component';
import { SalesComponent } from './sales.component';

import { TermsandPolicyComponent } from './termsand-policy/termsand-policy.component';

import { EmailsettingsComponent } from './emailsettings/emailsettings.component';
import { AddemailComponent } from './addemail/addemail.component';
import { EditemailComponent } from './editemail/editemail.component';
import { GooglemapurlComponent } from './googlemapurl/googlemapurl.component';
import { AddgooglemapurlComponent } from './addgooglemapurl/addgooglemapurl.component';

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

      {path:'termsandpolicy',component:TermsandPolicyComponent},
      {path:'addtermsandpolicy',component:AddtermsandpolicyComponent},
      {path:'edittermsandpolicy/:id/:value',component:EdittermsandpolicyComponent},

      {path:'emailsettings',component:EmailsettingsComponent},
      {path:'addemail',component:AddemailComponent},
      {path:'editemail/:id/:value',component:EditemailComponent},
      {path:'googlemapurl',component:GooglemapurlComponent},
      {path:'addgooglemapurl',component:AddgooglemapurlComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
