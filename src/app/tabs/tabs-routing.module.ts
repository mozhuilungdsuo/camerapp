import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../login/login.module').then((m) => m.LoginPageModule),
          },
          {
            path: 'camera',
            loadChildren: () =>
              import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
          },
          {
            path: 'gallery',
            loadChildren: () =>
              import('../gallery/gallery.module').then(
                (m) => m.GalleryPageModule
              ),
          },
        ],
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
