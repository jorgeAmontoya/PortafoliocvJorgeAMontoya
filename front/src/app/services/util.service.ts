import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private url = 'util';
  constructor(private http: HttpClient,
    private generalService: GeneralService) {
    //console.log('Servicio listo');
    this.url = generalService.genPath() + this.url;
    }

  getUtilPrincipal(c: number, p: number) {
    const headers = new HttpHeaders({
      'token': sessionStorage.getItem('token')
    });
      return this.http.get(this.url + `/principal/${c}/${p}`,{headers});
  }

  getUtilRelacion(c: number, p: number, a: number) {
    const headers = new HttpHeaders({
      'token': sessionStorage.getItem('token')
    });
    return this.http.get(this.url + `/relacion/${c}/${p}/${a}`,{headers});
  }
}
