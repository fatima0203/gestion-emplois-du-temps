import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [


  { path: '', redirectTo: 'login', pathMatch: 'full' },


  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.Login)
  },

  {
    path: 'enseignant',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/enseignant/enseignant')
        .then(m => m.Enseignant)
  },
  {
    path: 'cours',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/admin/cours.component/cours.component')
        .then(m => m.Cours)
  },

 
  {
    path: 'etudiant',
    canActivate: [authGuard],
    children: [
      {
        path: 'emploi-du-temps',
        loadComponent: () =>
          import('./pages/etudiant/emploi-du-temps/emploi-du-temps')
            .then(m => m.EmploiDuTemps)
      }
    ]
  },

  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [

      { path: '', redirectTo: 'edt', pathMatch: 'full' },

     
      {
        path: 'edt',
        loadComponent: () =>
          import('./pages/admin/edt/edt')
            .then(m => m.Edt)
      },

      
    
      // {
      //   path: 'enseignants',
      //   loadComponent: () =>
      //     import('./pages/admin/enseignant.component/enseignant.component')
      //       .then(m => m.Enseignant)
      // }
    ]
  },

 
  { path: '**', redirectTo: 'login' }
];