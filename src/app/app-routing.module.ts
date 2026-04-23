import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  // ✅ REDIRECCIÓN INICIAL (IMPORTANTE)
  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full'
  },

  // 📄 LISTA DE POKÉMON
  {
    path: 'pokemon',
    loadChildren: () =>
      import('./pages/pokemon-list/pokemon-list.module')
        .then(m => m.PokemonListPageModule)
  },

  // 🔍 DETALLE
  {
    path: 'pokemon/:name',
    loadChildren: () =>
      import('./pages/pokemon-detail/pokemon-detail.module')
        .then(m => m.PokemonDetailPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}