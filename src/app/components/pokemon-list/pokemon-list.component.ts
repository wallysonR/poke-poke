import { Component, OnInit } from '@angular/core';

import { PokeapiService } from '../../services/pokeapi.service';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = [];
  loading = true;

  limit = 18;
  offset = 0;
  page = 1;

  constructor(
    private readonly pokeapiService: PokeapiService
  ) {}

  ngOnInit(): void {
    this.fetchPokemons();
  }

  fetchPokemons(): void {
    this.loading = true;

    this.pokeapiService
      .getPokemons(this.limit, this.offset)
      .subscribe({
        next: (pokemons: Pokemon[]) => {
          this.pokemons = pokemons;
          this.loading = false;
        },

        error: (error: any) => {
          console.error(error);
          this.loading = false;
        }
      });
  }

  nextPage(): void {
    this.offset += this.limit;
    this.page++;

    this.fetchPokemons();
  }

  previousPage(): void {
    if (this.offset === 0) {
      return;
    }

    this.offset -= this.limit;
    this.page--;

    this.fetchPokemons();
  }
}