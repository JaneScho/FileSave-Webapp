import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'gallery',
        loadComponent: () =>
          import('../gallery/gallery.page').then((m) => m.GalleryPage),
      },
      {
        path: 'private',
        loadComponent: () =>
          import('../private/private.page').then((m) => m.PrivatePage),
      },
      {
        path: 'shared',
        loadComponent: () =>
          import('../shared/shared.page').then((m) => m.SharedPage),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('../search/search.page').then((m) => m.SearchPage),
      },
      {
        path: 'upload',
        loadComponent: () =>
          import('../upload/upload.page').then((m) => m.UploadPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../settings/settings.page').then((m) => m.SettingsPage),
      },
      {
        path: '',
        redirectTo: '/tabs/gallery',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/gallery',
    pathMatch: 'full',
  },
];
