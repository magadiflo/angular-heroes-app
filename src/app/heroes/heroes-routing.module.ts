import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';
import { SearchComponent } from './pages/search/search.component';
import { HeroComponent } from './pages/hero/hero.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent, //* En este momento, este componente se desplegará en la ruta padre (/heroes) para estas rutas hijas
    children: [ //* Para mostrar los componentes asociados a estas rutas hijas, en el HomeComponent.html debemos usar la directiva <router-outlet></router-outlet>
      { path: 'list', component: ListComponent, },
      { path: 'add', component: AddComponent, },
      { path: 'edit/:id', component: AddComponent, },
      { path: 'search', component: SearchComponent, },
      { path: ':id', component: HeroComponent, },
      { path: '**', redirectTo: 'list', },
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class HeroesRoutingModule { }
