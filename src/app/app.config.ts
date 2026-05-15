import { APP_INITIALIZER } from '@angular/core';
import { Router } from '@angular/router';

export const appConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (router: Router) => () => {
        // Initialize application settings or perform any necessary setup
        return Promise.resolve();
      },
      deps: [Router],
      multi: true
    }
  ],
  // Define your application routes here
  routes: [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
    { path: '**', redirectTo: '/home' }
  ]
};