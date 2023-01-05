import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from 'app/layout/common/messages/messages.component';
import { MatIcon } from '@angular/material/icon/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseHighlightModule } from '@fuse/components/highlight';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseScrollResetModule } from '@fuse/directives/scroll-reset';



@NgModule({
  declarations: [MessagesComponent],
  imports: [
    MatIcon,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        FuseHighlightModule,
        FuseAlertModule,
        FuseNavigationModule,
        FuseScrollResetModule,
  ]
})
export class MessagesModule { }
