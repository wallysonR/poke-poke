import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private readonly http: HttpClient) {}

  getPokemons(limit: number = 100, offset: number = 0): Observable<Pokemon[]> {
  return this.http
    .get<any>(`${this.apiUrl}?limit=${limit}&offset=${offset}`)
    .pipe(
      switchMap(response => {
        const requisicoes: Observable<Pokemon>[] = response.results.map((pokemon: any) =>
          this.getPokemonByName(pokemon.name)
        );

        return forkJoin(requisicoes);
      })
    );
}

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${name}`);
  }

  getPokemonById(id: number | string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }
}