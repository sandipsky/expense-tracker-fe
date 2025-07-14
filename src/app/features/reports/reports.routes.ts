import { Routes } from '@angular/router';
import { Reports } from './reports';

export const reportsRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: Reports
            },
        ]
    }
];
