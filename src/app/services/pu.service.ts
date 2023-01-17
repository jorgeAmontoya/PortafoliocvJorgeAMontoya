import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PuModel } from '../models/pu.model';
import { GeneralService } from './general.service';

import { RolService } from '../services/rol.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class PuService {

  private url = 'producto_usuario';
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

    getPu() {
      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
        });
        return this.http.get(this.url, {headers}).pipe(
            map(resp => this.createArray(resp))
        );
    }
  
    getPuById(id: number) {
      const headers = new HttpHeaders({
        'token': sessionStorage.getItem('token')
      });
        return this.http.get(this.url + `/${id}`,{headers});
    }
  
    postPu(pu: PuModel) {
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
          return this.http.post(this.url, pu, {headers});
        }
    }
  
    filterPu(pu: PuModel) {
      const headers = new HttpHeaders({
        'token': sessionStorage.getItem('token')
      });
        return this.http.post(this.url + '/filter', pu, {headers}).pipe(
            map(resp => this.createArray(resp))
        );
    }
  
    putPu(pu: PuModel) {      
      
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
          return this.http.put(this.url, pu,{headers});
        }
  
    }
  
    deletePu(id: number) {
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
  
    private createArray(pusObj: object) {
        const pus: PuModel[] = [];
        if (pusObj === null) {return []; }
  
        Object.keys(pusObj).forEach(key => {
            const pu: PuModel = pusObj[key];
            pus.push(pu);
        });
  
        return pus;
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