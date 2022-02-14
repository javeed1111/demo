import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './emailconfig-routing.module';
import { EmaillistComponent } from './emaillist/emaillist.component';
import { EmailschedularComponent } from './emailschedular/emailschedular.component';
import { EmailserverComponent } from './emailserver/emailserver.component';
import { UnsubscribeemailComponent } from './unsubscribeemail/unsubscribeemail.component';
import { EmailsendingComponent } from './emailsending/emailsending.component';
import { EmailsmstemplateComponent } from './emailsmstemplate/emailsmstemplate.component';
import { EmailConfigComponent } from './emailconfig.component';


@NgModule({
  declarations: [
    EmaillistComponent,
    EmailschedularComponent,
    EmailserverComponent,
    UnsubscribeemailComponent,
    EmailsendingComponent,
    EmailsmstemplateComponent,
    EmailConfigComponent
  ],
  imports: [
    CommonModule,
    EmailRoutingModule
  ]
})
export class EmailModule { }
