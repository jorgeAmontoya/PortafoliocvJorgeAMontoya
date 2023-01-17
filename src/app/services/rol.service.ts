import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RolModel } from '../models/rol.model';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url = 'rol';
  constructor(private http: HttpClient,
    private generalService: GeneralService) {
    //console.log('Servicio listo');
    this.url = generalService.genPath() + this.url;
    }

  getRol() {
    const headers = new HttpHeaders({
        'token': sessionStorage.getItem('token')
    });
      return this.http.get(this.url, {headers}).pipe(
          map(resp => this.createArray(resp))
      );
  }

  getRolById(id: number) {
    const headers = new HttpHeaders({
        'token': sessionStorage.getItem('token')
    });
      return this.http.get(this.url + `/${id}`,{headers}).pipe(
            map(resp => this.createArray(resp))
        );
  }

  postRol(rol: RolModel) {
    const headers = new HttpHeaders({
        'token': sessionStorage.getItem('token')
    });
      return this.http.post(this.url, rol, {headers});
  }

  filterRol(rol: RolModel) {
      return this.http.post(this.url + '/filter', rol).pipe(
          map(resp => this.createArray(resp))
      );
  }

  putRol(rol: RolModel) {
      return this.http.put(this.url, rol);
  }

  deleteRol(id: number) {
    const headers = new HttpHeaders({
      'token': sessionStorage.getItem('token')
    });
    return this.http.delete(this.url + `/${id}`,{headers});
  }

  private createArray(rolsObj: object) {
      const rols: RolModel[] = [];
      if (rolsObj === null) {return []; }

      Object.keys(rolsObj).forEach(key => {
          const rol: RolModel = rolsObj[key];
          rols.push(rol);
      });

      return rols;
  }

}
