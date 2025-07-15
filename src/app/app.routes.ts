import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
    {
        path: '',
        component: Layout,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: Dashboard,
            },
            {
                path: 'calendar',
                loadComponent: () => import('./features/calendar/calendar').then(m => m.Calendar)
            },
            {
                path: 'transactions',
                loadComponent: () => import('./features/transaction/transaction').then(m => m.Transaction)
            },
            {
                path: 'budget',
                loadComponent: () => import('./features/budget/budget').then(m => m.Budget)
            },
            {
                path: 'accounts',
                loadComponent: () => import('./features/account/account').then(m => m.Account)
            },
            {
                path: 'users',
                loadComponent: () => import('./features/user/user').then(m => m.User)
            },
            {
                path: 'category',
                loadComponent: () => import('./features/category/category').then(m => m.Category)
            },
            {
                path: 'reports',
                loadChildren: () => import('./features/reports/reports.routes').then(m => m.reportsRoutes)
            },
            {
                path: 'settings',
                loadComponent: () => import('./features/settings/settings').then(m => m.Settings)
            }
        ]
    }
];
