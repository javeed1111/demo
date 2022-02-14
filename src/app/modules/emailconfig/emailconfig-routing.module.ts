import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailConfigComponent } from './emailconfig.component';
import { EmaillistComponent } from './emaillist/emaillist.component';
import { EmailschedularComponent } from './emailschedular/emailschedular.component';
import { EmailsendingComponent } from './emailsending/emailsending.component';
import { EmailserverComponent } from './emailserver/emailserver.component';
import { EmailsmstemplateComponent } from './emailsmstemplate/emailsmstemplate.component';
import { UnsubscribeemailComponent } from './unsubscribeemail/unsubscribeemail.component';

const routes: Routes = [
  {
    path: '', component: EmailConfigComponent,
        children: [
            { path: '', redirectTo: 'emaillist', pathMatch: 'full' },
            { path: 'emaillist', component: EmaillistComponent },
            { path: 'emailschedular', component: EmailschedularComponent },
            { path: 'emailservers', component: EmailserverComponent },
            { path: 'unsubscribeemail', component: UnsubscribeemailComponent },
            { path: 'emailsending', component: EmailsendingComponent },
            { path: 'emailsmstemplate', component: EmailsmstemplateComponent },
            

        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
