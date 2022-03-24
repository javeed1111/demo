import { Route, RouterModule} from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { NgModule } from '@angular/core';
// import { NgModule } from '@angular/core';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'userconfig'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'userconfig'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },

    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.module').then(m => m.ExampleModule)},
            {path: 'userconfig', loadChildren: () => import('app/modules/userconfig/userconfig.module').then(m => m.UserconfigModule)},
            {path: 'emailconfig', loadChildren: () => import('app/modules/emailconfig/emailconfig.module').then(m => m.EmailModule)},
            {path: 'courses', loadChildren: () => import('app/modules/courses/courses.module').then(m => m.CoursesModule)},
            {path: 'selflrvds', loadChildren: () => import('app/modules/selflearningvideos/selflearningvideos.module').then(m => m.SelflearningvideosModule)},
            {path: 'reports', loadChildren: () => import('app/modules/reports/reports.module').then(m => m.ReportsModule)},
            {path: 'enqrmgmt', loadChildren: () => import('app/modules/enquirymanagement/enquirymanagement.module').then(m => m.EnquirymanagementModule)},
            {path: 'masters', loadChildren: () => import('app/modules/masters/masters.module').then(m => m.MastersModule)},
            {path: 'batches', loadChildren: () => import('app/modules/batches/batches.module').then(m => m.BatchesModule)},
            {path: 'students', loadChildren: () => import('app/modules/students/students.module').then(m => m.StudentsModule)},
            {path: 'feedetails', loadChildren: () => import('app/modules/feedetails/feedetails.module').then(m => m.FeedetailsModule)},
            {path: 'faculty', loadChildren: () => import('app/modules/faculty/faculty.module').then(m => m.FacultyModule)},





        ]
    }
        
];
// @NgModule({

//     imports: [RouterModule.forRoot(appRoutes, {
//         scrollPositionRestoration: 'enabled',
//         anchorScrolling: 'enabled',
//         initialNavigation: 'enabled',
//         useHash:true,
//         enableTracing:true
//     })],
//     exports: [RouterModule]
// })
// export class AppRoutingModule { }

