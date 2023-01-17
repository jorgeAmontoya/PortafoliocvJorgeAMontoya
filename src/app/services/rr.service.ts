import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RrModel } from '../models/rr.model';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class RrService {

  private url = 'rol_ruta';
  constructor(private http: HttpClient,
    private generalService: GeneralService) {
    //console.log('Servicio listo');
    this.url = generalService.genPath() + this.url;
    }

  getRr() {
      return this.http.get(this.url).pipe(
          map(resp => this.createArray(resp))
      );
  }

  getRrById(id: number) {
      return this.http.get(this.url + `/${id}`);
  }

  postRr(rr: RrModel) {
    const headers = new HttpHeaders({
        'token': sessionStorage.getItem('token')
    });
      return this.http.post(this.url, rr, {headers});
  }

  filterRr(rr: RrModel) {
    const headers = new HttpHeaders({
        'token': sessionStorage.getItem('token')
    });      
      return this.http.post(this.url + '/filter', rr, {headers}).pipe(
          map(resp => this.createArray(resp))
      );
  }

  putRr(rr: RrModel) {
      return this.http.put(this.url, rr);
  }

  deleteRr(id: number) {
      return this.http.delete(this.url + `/${id}`);
  }

  private createArray(rrsObj: object) {
      const rrs: RrModel[] = [];
      if (rrsObj === null) {return []; }

      Object.keys(rrsObj).forEach(key => {
          const rr: RrModel = rrsObj[key];
          rrs.push(rr);
      });

      return rrs;
  }
}
