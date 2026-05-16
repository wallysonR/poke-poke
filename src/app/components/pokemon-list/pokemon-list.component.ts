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
  pokemonsFiltrados: Pokemon[] = [];

  filtro = '';

  loading = true;

  limit = 20;
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
          this.pokemonsFiltrados = pokemons;
          this.loading = false;
        },
        error: (error: any) => {
          console.error(error);
          this.loading = false;
        }
      });
  }

  tiposTraduzidos: { [key: string]: string } = {
  normal: 'Normal',
  fire: 'Fogo',
  water: 'Água',
  electric: 'Elétrico',
  grass: 'Planta',
  ice: 'Gelo',
  fighting: 'Lutador',
  poison: 'Veneno',
  ground: 'Terra',
  flying: 'Voador',
  psychic: 'Psíquico',
  bug: 'Inseto',
  rock: 'Pedra',
  ghost: 'Fantasma',
  dragon: 'Dragão',
  dark: 'Sombrio',
  steel: 'Aço',
  fairy: 'Fada'
};

traduzirTipo(tipo: string): string {
  return this.tiposTraduzidos[tipo] || tipo;
}

  filtrar(): void {
    const valor = this.filtro.trim().toLowerCase();

    if (!valor) {
      this.pokemonsFiltrados = this.pokemons;
      return;
    }

    this.pokemonsFiltrados = this.pokemons.filter((pokemon: Pokemon) => {
      const id = pokemon.id.toString();
      const nome = pokemon.name.toLowerCase();
      const tipos = pokemon.types
        .map(tipo => tipo.type.name.toLowerCase())
        .join(' ');

      return id.includes(valor)
        || nome.includes(valor)
        || tipos.includes(valor);
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