import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserconfigRoutingModule } from './userconfig-routing.module';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { SetprivilegesComponent } from './setprivileges/setprivileges.component';
import { UserConfigComponent } from './userconfig.component';
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
import { UsersListComponent } from './user/lists/list.component';
import { UsersDetailsComponent } from './user/userDetails/userdetails.component';
import { AddUserComponent } from './user/Adduser/adduser.component';
import { MatSortModule } from '@angular/material/sort';
import { AddrolesComponent } from './Addrole/addroles/addroles.component';
import { EditroleComponent } from './EditRole/editrole/editrole.component';
import { AutofocusDirective } from './Directive/autofocus.directive';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FuseAlertModule } from '@fuse/components/alert';



import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';


//import {MatPaginator} from '@angular/material/paginator'


@NgModule({
  declarations: [
    RoleComponent,
    UserComponent,
    SetprivilegesComponent,
    UserConfigComponent,
    UsersListComponent,
    UsersDetailsComponent,
    AddUserComponent,
    AddrolesComponent,
    EditroleComponent,
    AutofocusDirective,
    DashboardComponent

  ],
  imports: [
    CommonModule,
    UserconfigRoutingModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
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
    MatPaginatorModule,
    SharedModule,
    FuseAlertModule,
    NgApexchartsModule,
    TranslocoModule,
    MatTabsModule,
    MatButtonToggleModule
  ],
  providers   : [
    {
        provide : MAT_DATE_FORMATS,
        useValue: {
            parse  : {
                dateInput: moment.ISO_8601
            },
            display: {
                dateInput         : 'LL',
                monthYearLabel    : 'MMM YYYY',
                dateA11yLabel     : 'LL',
                monthYearA11yLabel: 'MMMM YYYY'
            }
        }
    }
]
})
export class UserconfigModule { }
// function contactsRoutes(contactsRoutes: any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
//   throw new Error('Function not implemented.');
// }

