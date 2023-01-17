import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RutaModel } from '../models/ruta.model';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class RutaService {

  private url = 'ruta';
  constructor(private http: HttpClient,
    private generalService: GeneralService) {
    //console.log('Servicio listo');
    this.url = generalService.genPath() + this.url;
    }

  getRuta() {
      return this.http.get(this.url).pipe(
          map(resp => this.createArray(resp))
      );
  }

  getRutaById(id: number) {
      return this.http.get(this.url + `/${id}`);
  }

  postRuta(ruta: RutaModel) {
      return this.http.post(this.url, ruta);
  }

  filterRuta(ruta: RutaModel) {
      return this.http.post(this.url + '/filter', ruta).pipe(
          map(resp => this.createArray(resp))
      );
  }

  putRuta(ruta: RutaModel) {
      return this.http.put(this.url, ruta);
  }

  deleteRuta(id: number) {
      return this.http.delete(this.url + `/${id}`);
  }

  private createArray(rutasObj: object) {
      const rutas: RutaModel[] = [];
      if (rutasObj === null) {return []; }

      Object.keys(rutasObj).forEach(key => {
          const ruta: RutaModel = rutasObj[key];
          rutas.push(ruta);
      });

      return rutas;
  }
}
