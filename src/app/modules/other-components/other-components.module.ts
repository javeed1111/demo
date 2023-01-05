import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';
import { SharedModule } from 'app/shared/shared.module';
import { OtherComponentsComponent } from './other-components.component';
 import { OverviewComponent } from './common/overview/overview.component';

// import { ApexChartsComponent } from './third-party/apex-charts/apex-charts.component';

// import { QuillEditorComponent } from 'ngx-quill';

import { otherComponentsRoutes } from './other-components.routing';
import { MatIconModule } from '@angular/material/icon'
import { MessagesComponent } from './common/messages/messages.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { QuillModule } from 'ngx-quill';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// import { otherComponentsRoutes } from 'app/modules/admin/ui/other-components/other-components.routing';

@NgModule({
    declarations: [
        OtherComponentsComponent,
         OverviewComponent,
         MessagesComponent
        //  ApexChartsComponent,
        // QuillEditorComponent,
        
    ],
    imports     : [
    
        // NgxColorsModule,
        // BrowserModule,
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
        SharedModule,RouterModule.forChild(otherComponentsRoutes),MatIconModule,
    ]
})
export class OtherComponentsModule
{
}
