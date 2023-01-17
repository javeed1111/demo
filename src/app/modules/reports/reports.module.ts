import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReferencelistComponent } from './referencelist/referencelist.component';
import { UsersenquiryComponent } from './usersenquiry/usersenquiry.component';
import { UserssubscribedcoursesComponent } from './userssubscribedcourses/userssubscribedcourses.component';
import { DaywiseenquireComponent } from './daywiseenquire/daywiseenquire.component';
import { ReferralrequestsComponent } from './referralrequests/referralrequests.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { QuillModule } from 'ngx-quill';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    ReportsComponent,
    ReferencelistComponent,
    UsersenquiryComponent,
    UserssubscribedcoursesComponent,
    DaywiseenquireComponent,
    ReferralrequestsComponent,
    StudentDetailsComponent
  ],
  imports: [
    MatIconModule,
    CommonModule,
    ReportsRoutingModule,
    FormsModule, 
    MatCheckboxModule,    
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,      
    MatTooltipModule,
    MatSlideToggleModule,
    FuseFindByKeyPipeModule,
    MatSortModule,
    MatPaginatorModule,
    QuillModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
   MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    FuseHighlightModule,
    FuseAlertModule,
    FuseNavigationModule,
    FuseScrollResetModule,
    SharedModule,
    
  ]
})
export class ReportsModule { }
