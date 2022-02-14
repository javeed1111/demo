import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelfLearningVideoComponent } from './selflearningvideo.component';
import { SelflearningvideosComponent } from './selflearningvideos/selflearningvideos.component';

const routes: Routes = [
  {
    path:'', component:SelfLearningVideoComponent,
    children:[
      {path:'', redirectTo: 'selflearningvds',pathMatch:'full'},
      {path:'selflearningvds',component:SelflearningvideosComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelflearningvideosRoutingModule { }
