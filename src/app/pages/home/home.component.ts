import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../../services/pokeapi.service';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pokemons: Pokemon[] = [];

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.pokeapiService.getPokemons().subscribe((data: Pokemon[]) => {
      this.pokemons = data;
    });
  }
}