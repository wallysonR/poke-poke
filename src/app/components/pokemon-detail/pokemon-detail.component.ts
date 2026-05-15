import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly pokeapiService: PokeapiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.pokeapiService.getPokemonById(id).subscribe((data: any) => {
        this.pokemon = data;
      });
    }
  }

  goBack(): void {
  this.router.navigate(['/']);
}
}