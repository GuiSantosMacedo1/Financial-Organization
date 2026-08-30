import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'transactions',canActivate: [authGuard], loadComponent: () => import('./transactions/transactions.component').then(m => m.TransactionsComponent) },
  { path: 'novoUsuario', loadComponent: () => import('./shared/novo-usuario/novo-usuario.component').then(m => m.NovoUsuarioComponent) },
  { path: 'metas', canActivate: [authGuard], loadComponent: () => import('./metas/metas.component').then(m => m.MetasComponent) }
];


