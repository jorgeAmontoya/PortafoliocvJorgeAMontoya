import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BpModel } from '../models/bp.model';
import { GeneralService } from './general.service';

import { RolService } from '../services/rol.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class BpService {

  private url = 'bodega_producto';
  regulator;
  constructor(private http: HttpClient,
              private generalService: GeneralService,
              private rolService: RolService,
              private translate: TranslateService,) {
    //console.log('Servicio listo');
    this.url = generalService.genPath() + this.url;

    if(sessionStorage.getItem('id_rol')){
      this.rolService.getRolById(Number(sessionStorage.getItem('id_rol'))).subscribe(resp =>
        { 
          this.regulator = resp;
          console.log(this.regulator);
        }
        );
        return this.regulator;
    }

    console.log(this.regulator);
    }

    getBp() {
      const headers = new HttpHeaders({
        'token': sessionStorage.getItem('token')
        });
      return this.http.get(this.url,{headers}).pipe(
          map(resp => this.createArray(resp))
      );
  }

  getBpById(id: number) {
    const headers = new HttpHeaders({
      'token': sessionStorage.getItem('token')
    });
      return this.http.get(this.url + `/${id}`,{headers});
  }

  getminstock(minstock: number) {
    const headers = new HttpHeaders({
      'token': sessionStorage.getItem('token')
    });
      return this.http.get(this.url +'/stock'+ `/${minstock}`,{headers}).pipe(
        map(resp => this.createArray(resp))
      );
  }

  postBp(bp: BpModel) {
    const headers = new HttpHeaders({
      'token': sessionStorage.getItem('token')
    });
    this.privilegios();
      if(this.regulator[0].can_create == false){
        this.translate.get('privinsuf').subscribe((resp1: string)=>{
        this.translate.get('fucntionnotper').subscribe((resp2: string)=>{ 
          Swal.fire({
            icon: 'error',
            title: resp1,
            text: resp2
          })
        });
        });
      }
      else{
        return this.http.post(this.url, bp,{headers});
      }
  }

  filterBp(bp: BpModel) {  
      return this.http.post(this.url + '/filter', bp).pipe(
          map(resp => this.createArray(resp))
      );
  }
  filter_especialBp(bp: BpModel) { 
    console.log("filtro especial") 
    return this.http.post(this.url + '/filter_especial', bp).pipe(
        map(resp => this.createArray(resp))
    );
}
  putBp(bp: BpModel) {
    const headers = new HttpHeaders({
      'token': sessionStorage.getItem('token')
    });    
    this.privilegios();
    if(this.regulator[0].can_update == false){
      this.translate.get('privinsuf').subscribe((resp1: string)=>{
      this.translate.get('fucntionnotper').subscribe((resp2: string)=>{ 
        Swal.fire({
          icon: 'error',
          title: resp1,
          text: resp2
        })
      });
      });
    }
    else{
      return this.http.put(this.url, bp,{headers});
    }

  }

  deleteBp(id: number) {

    const headers = new HttpHeaders({
      'token': sessionStorage.getItem('token')
    });        
    this.privilegios();
    if(this.regulator[0].can_delete == false){
      this.translate.get('privinsuf').subscribe((resp1: string)=>{
      this.translate.get('fucntionnotper').subscribe((resp2: string)=>{ 
        Swal.fire({
          icon: 'error',
          title: resp1,
          text: resp2
        })
      });
      });
    }
    else{
      return this.http.delete(this.url + `/${id}`,{headers});
    }
  }

  private createArray(bpsObj: object) {
      const bps: BpModel[] = [];
      if (bpsObj === null) {return []; }

      Object.keys(bpsObj).forEach(key => {
          const bp: BpModel = bpsObj[key];
          bps.push(bp);
      });

      return bps;
  }

  privilegios(){

    if(sessionStorage.getItem('id_rol')){
      this.rolService.getRolById(Number(sessionStorage.getItem('id_rol'))).subscribe(resp =>
        { 
          this.regulator = resp;
          //console.log(resp);
        }
        );
        return this.regulator;
    }
    
  }

}