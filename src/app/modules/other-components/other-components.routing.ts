import { Route } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import { MessagesComponent } from './common/messages/messages.component';

import { OverviewComponent } from './common/overview/overview.component';

import { OtherComponentsComponent } from './other-components.component';

QuillEditorComponent
export const otherComponentsRoutes: Route[] = [
    {
        path     : '',
        component: OtherComponentsComponent,
        children : [
            {
                path      : '',
                pathMatch : 'full',
                redirectTo: 'common/overview'
            },
            {
                path    : 'common',
                children: [
                    {
                        path      : '',
                        pathMatch : 'full',
                        redirectTo: 'overview'
                    },
                     {
                        path     : 'overview',
                        component: OverviewComponent
                    },
                    {
                        path     : 'messages',
                        component: MessagesComponent
                    },
                   
                ]
            },
            // {
            //     path    : 'third-party',
            //     children: [
            //         {
            //             path      : '',
            //             pathMatch : 'full',
            //             redirectTo: 'apex-charts'
            //         },
                   
                    
            //     ]
            // }
        ]
    }
];
