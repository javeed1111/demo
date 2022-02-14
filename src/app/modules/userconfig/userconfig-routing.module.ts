import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { SetprivilegesComponent } from './setprivileges/setprivileges.component';
import { UserComponent } from './user/user.component';
import { UserConfigComponent } from './userconfig.component';

const routes: Routes = [
  {
    path: '', component: UserConfigComponent,
        children: [
            { path: '', redirectTo: 'default', pathMatch: 'full' },
            { path: 'default', component: UserConfigComponent },
            { path: 'role', component: RoleComponent },
            { path: 'user', component: UserComponent },
            { path: 'Setprivileges', component: SetprivilegesComponent }
        ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserconfigRoutingModule { }
