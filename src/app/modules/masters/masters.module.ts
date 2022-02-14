import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { MastersComponent } from './masters.component';
import { EnquirystatusComponent } from './enquirystatus/enquirystatus.component';
import { EnquirytypeComponent } from './enquirytype/enquirytype.component';
import { LearningmodeComponent } from './learningmode/learningmode.component';


@NgModule({
  declarations: [
    MastersComponent,
    EnquirystatusComponent,
    EnquirytypeComponent,
    LearningmodeComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule
  ]
})
export class MastersModule { }
