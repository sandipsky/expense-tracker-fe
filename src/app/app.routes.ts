import { Routes } from '@angular/router';
import { Layout } from './layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';

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
                loadComponent: () => import('./pages/calendar/calendar').then(m => m.Calendar)
            },
            {
                path: 'transactions',
                loadComponent: () => import('./pages/transaction/transaction').then(m => m.Transaction)
            },
            {
                path: 'budget',
                loadComponent: () => import('./pages/budget/budget').then(m => m.Budget)
            },
            {
                path: 'accounts',
                loadComponent: () => import('./pages/account/account').then(m => m.Account)
            },
            {
                path: 'users',
                loadComponent: () => import('./pages/user/user').then(m => m.User)
            },
            {
                path: 'category',
                loadComponent: () => import('./pages/category/category').then(m => m.Category)
            },
            {
                path: 'reports',
                loadChildren: () => import('./pages/reports/reports.routes').then(m => m.reportsRoutes)
            },
            {
                path: 'settings',
                loadComponent: () => import('./pages/settings/settings').then(m => m.Settings)
            }
        ]
    }
];
