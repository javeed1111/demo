import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddrolesComponent } from './Addrole/addroles/addroles.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { EditroleComponent } from './EditRole/editrole/editrole.component';
import { ProjectResolver } from './project.resolvers';
import { RoleComponent } from './role/role.component';
import { SetprivilegesComponent } from './setprivileges/setprivileges.component';
import { AddUserComponent } from './user/Adduser/adduser.component';
import { UsersListComponent } from './user/lists/list.component';
import { UserComponent } from './user/user.component';
import { CanDeactivateContactsDetails } from './user/user.gaurds';
import { ContactsContactResolver, ContactsCountriesResolver, ContactsResolver, ContactsTagsResolver } from './user/user.resolvers';
import { UsersDetailsComponent } from './user/userDetails/userdetails.component';
import { UserConfigComponent } from './userconfig.component';

const routes: Routes = [
  {
    path: '', component: UserConfigComponent, resolve  : {
      data: ProjectResolver
  },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'default', component: UserConfigComponent },
      { path: 'dashboard', component: DashboardComponent },
      //{ path: 'user', component: UserComponent },
      { path: 'Setprivileges', component: SetprivilegesComponent },
      { path: 'role', component: RoleComponent },
      { path: 'addrole', component: AddrolesComponent },
      { path: 'editrole/:id/:value', component: EditroleComponent },
      {
        path: 'user',
        component: UserComponent,
        resolve: {
          tags: ContactsTagsResolver
        },
        children: [
          {
            path: '',
            component: UsersListComponent,
            resolve: {
              contacts: ContactsResolver,
              countries: ContactsCountriesResolver
            },
            children: [
              {
                path: 'adduser',
                component: AddUserComponent,
                resolve: {
                  countries: ContactsCountriesResolver
                }
              },
              {
                path: ':id',
                component: UsersDetailsComponent,
                resolve: {
                  contact: ContactsContactResolver,
                  countries: ContactsCountriesResolver
                },
                canDeactivate: [CanDeactivateContactsDetails]
              }

            ]
          }
        ]
      }
    ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserconfigRoutingModule { }
