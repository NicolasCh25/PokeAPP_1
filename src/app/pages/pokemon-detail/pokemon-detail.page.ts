import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {

  pokemon: any;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.getPokemon(name);
    }
  }

  getPokemon(name: string) {
    this.loading = true;

    this.pokemonService.getPokemonDetail(name).subscribe({
      next: (data: any) => {
        this.pokemon = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar Pokémon:', error);
        this.loading = false;
      }
    });
  }
}