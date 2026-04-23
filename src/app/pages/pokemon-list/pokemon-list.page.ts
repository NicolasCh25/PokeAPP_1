import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {

  pokemons: any[] = [];
  loading = false;
  searchTerm: string = '';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.fetchPokemons();
  }

  //LISTA PRINCIPAL DE POKÉMON
  fetchPokemons() {
    this.loading = true;
    this.pokemons = [];

    this.pokemonService.getPokemons(20).subscribe({
      next: (response: any) => {
        const results = response.results;

        let loaded = 0;
        const total = results.length;

        results.forEach((pokemon: any) => {
          this.pokemonService.getPokemonDetail(pokemon.name)
            .subscribe({
              next: (detail: any) => {
                this.pokemons = [...this.pokemons, detail];

                loaded++;

                // ✅ cuando termina todo
                if (loaded === total) {
                  this.loading = false;
                }
              },
              error: () => {
                loaded++;

                if (loaded === total) {
                  this.loading = false;
                }
              }
            });
        });
      },
      error: (error) => {
        console.error('Error al cargar Pokémon:', error);
        this.loading = false;
      }
    });
  }

  // BUSCADOR
  searchPokemon() {
    const name = this.searchTerm.toLowerCase().trim();

    if (name === '') {
      this.fetchPokemons();
      return;
    }

    this.loading = true;
    this.pokemons = [];

    this.pokemonService.getPokemonDetail(name).subscribe({
      next: (pokemon: any) => {
        this.pokemons = [pokemon];
        this.loading = false;
      },
      error: () => {
        console.error('Pokémon no encontrado');
        this.loading = false;
      }
    });
  }
}