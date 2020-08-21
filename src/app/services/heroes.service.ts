import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../Model/heroes.model';
import { map, delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url = 'https://crud-e645b.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe = (heroe: HeroeModel) => {

return this.http.post(`${this.url}/heroe.json`, heroe)
.pipe(
  map((resp: any) => {
    heroe.id = resp.name;
    return heroe;
  })
);

}

borrarHeroe(id: string) {
 return this.http.delete(`${this.url}/heroe/${id}.json`);
}

actualizarHeroe(heroe: HeroeModel){
  const heroeTemp = {
    ...heroe
  };
  delete heroeTemp.id;
  return this.http.put(`${this.url}/heroe/${heroe.id}.json`, heroeTemp);

  }

  getHeroes(){
    return this.http.get(`${this.url}/heroe.json`).pipe(
      map(resp => this.crearArreglo(resp)), delay(1000)
    );
  }


  crearArreglo(heroesObj: object){

    const heroes: HeroeModel[] = [];

    console.log(heroesObj);

    if (heroesObj === null){return []; }

    Object.keys(heroesObj).forEach(key => {

const heroe: HeroeModel = heroesObj [key];

heroe.id = key;

heroes.push(heroe);

    });
    return heroes;

  }

  getHeroe(id: string){
  return  this.http.get(`${this.url}/heroe/${id}.json`);
  }
}
