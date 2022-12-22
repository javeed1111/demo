import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { MatInputModule } from '@angular/material/input';
import { SalesComponent } from './modules/sales/sales.component';
import { ProgressspinnerComponent } from './modules/progressspinner/progressspinner.component';
import { ProgressSpinnerModule } from './modules/progressspinner/progress-spinner/progress-spinner.module';
import { ProgressSpinnerDemoComponent } from './modules/progressspinner/progress-spinner-demo/progress-spinner-demo.component';
import { ProgressSpinnerComponent } from './modules/progressspinner/progress-spinner/progress-spinner.component';
// import {LocationStrategy, HashLocationStrategy} from '@angular/common';

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent,
        SalesComponent,
        
        ProgressspinnerComponent,
        ProgressSpinnerDemoComponent,
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, {useHash:true}),
        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),
        ProgressSpinnerModule,
        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,
        
        MatInputModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        // AppRoutingModule
    ],
    entryComponents: [AppComponent,ProgressSpinnerComponent],
    bootstrap   : [
        AppComponent
    ]
    // bootstrap(MyApp, [
    //     ROUTER_PROVIDERS,
    //     {provide: LocationStrategy, useClass: HashLocationStrategy}
    //   ]);
      
})
export class AppModule
{
}
