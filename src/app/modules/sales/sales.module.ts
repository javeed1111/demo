import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { DashboardbannerComponent } from './dashboardbanner/dashboardbanner.component';
import { AdddashboardbannerComponent } from './adddashboardbanner/adddashboardbanner.component';
import { EditdashboardbannerComponent } from './editdashboardbanner/editdashboardbanner.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as moment from 'moment';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { SharedModule } from 'app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { QuillModule } from 'ngx-quill';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { AddconfigurationsComponent } from './addconfigurations/addconfigurations.component';
import { EditconfigurationsComponent } from './editconfigurations/editconfigurations.component';
import { MasternavigationComponent } from './masternavigation/masternavigation.component';
// import { CompanydetailsComponent } from './companydetails/companydetails.component';
import { AddcompanydetailsComponent } from './addcompanydetails/addcompanydetails.component';
import { EditcompanydetailsComponent } from './editcompanydetails/editcompanydetails.component';
import { CompanydetailsComponent } from './companydetails/companydetails.component';

import { TermsandPolicyComponent } from './termsand-policy/termsand-policy.component';
import { AddtermsandpolicyComponent } from './addtermsandpolicy/addtermsandpolicy.component';
import { EdittermsandpolicyComponent } from './edittermsandpolicy/edittermsandpolicy.component';

import { EmailsettingsComponent } from './emailsettings/emailsettings.component';
import { AddemailComponent } from './addemail/addemail.component';
import { EditemailComponent } from './editemail/editemail.component';
import { GooglemapurlComponent } from './googlemapurl/googlemapurl.component';
import { AddgooglemapurlComponent } from './addgooglemapurl/addgooglemapurl.component';
import { EditgooglemapurlComponent } from './editgooglemapurl/editgooglemapurl.component';


//import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    ConfigurationsComponent,
    DashboardbannerComponent,
    AdddashboardbannerComponent,
    EditdashboardbannerComponent,
    AddconfigurationsComponent,
    EditconfigurationsComponent,
    MasternavigationComponent,
    CompanydetailsComponent,
    AddcompanydetailsComponent,
    EditcompanydetailsComponent,

    TermsandPolicyComponent,
    AddtermsandpolicyComponent,
    EdittermsandpolicyComponent,

    EmailsettingsComponent,
    AddemailComponent,
    EditemailComponent,
    GooglemapurlComponent,
    AddgooglemapurlComponent,
    EditgooglemapurlComponent,
    


  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MatIconModule,
    MatSortModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTooltipModule,
    MatSlideToggleModule,
    FuseFindByKeyPipeModule,
    MatSortModule,
    MatInputModule,
    MatPaginatorModule,
    SharedModule,
    QuillModule,
    FuseAlertModule,
    MatStepperModule,
    
  ]
})
export class SalesModule { }
