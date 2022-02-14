import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserconfigRoutingModule } from './userconfig-routing.module';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { SetprivilegesComponent } from './setprivileges/setprivileges.component';
import { UserConfigComponent } from './userconfig.component';


@NgModule({
  declarations: [
    RoleComponent,
    UserComponent,
    SetprivilegesComponent,
    UserConfigComponent
  ],
  imports: [
    CommonModule,
    UserconfigRoutingModule
  ]
})
export class UserconfigModule { }
