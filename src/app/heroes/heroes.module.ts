import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { HeroesRoutingModule } from './heroes-routing.module';

import { AddComponent } from './pages/add/add.component';
import { SearchComponent } from './pages/search/search.component';
import { HeroComponent } from './pages/hero/hero.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { ConfirmComponent } from './components/confirm/confirm.component';

/**
 ** NO VAMOS A EXPORTAR NADA que no sea necesario ya que 
 ** utilizaremos carga perezosa (lazy load).
 **
 ** FlexLayoutModule, lo importaremos aquí, por que solo aquí trabajaremos 
 ** con el flexLayout
 */

@NgModule({
  declarations: [
    AddComponent,
    SearchComponent,
    HeroComponent,
    HomeComponent,
    ListComponent,
    HeroCardComponent,
    ImagenPipe,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    HeroesRoutingModule,
  ]
})
export class HeroesModule { }
