import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../Model/heroes.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[] = [];
cargando = false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.heroesService.getHeroes()
    .subscribe(resp => {
      console.log(resp);
      this.heroes = resp;
      this.cargando = false;
    })
  }

  borrarHeroe (heroe: HeroeModel, i: number){
    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esto se eliminará permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo'
    }).then((result) => {
      if (result.value){
        Swal.fire(
          'Borrado',
          '',
          'success'
        );
        this.heroes.splice(i, 1);
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }
    });

  }
}
