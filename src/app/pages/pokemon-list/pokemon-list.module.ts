import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { PokemonListPage } from './pokemon-list.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes) // 🔥 ESTO ES LO QUE FALTABA
  ],
  declarations: [PokemonListPage]
})
export class PokemonListPageModule {}