import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CCostosModel } from '../models/ccostos.model';
import { GeneralService } from './general.service';

import { RolService } from './rol.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class CentroCostosService {

  private url = 'centro_costos';
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
          //console.log(this.regulator);
        }
        );
        return this.regulator;
    }

    //console.log(this.regulator);

    }

    getCentroCostos() {

      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.get(this.url,{headers}).pipe(
            map(resp => this.createArray(resp))
        );
    }
  
    getCentroCostosById(id: number) {
      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.get(this.url + `/${id}`,{headers}).pipe(
              map(resp => this.createArray(resp))
          );
    }
  
    postCentroCostos(centro_costos: CCostosModel) {

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
        return this.http.post(this.url, centro_costos, {headers});
      }
  
    }
  
    filterCentroCostos(centro_costos: CCostosModel) {
      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.post(this.url + '/filter', centro_costos,{headers}).pipe(
            map(resp => this.createArray(resp))
        );
    }
  
    putCentroCostos(centro_costos: CCostosModel) {
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
          return this.http.put(this.url, centro_costos,{headers});
        }
    }
  
    deleteCentroCostos(id: number) {
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
  
    private createArray(centro_costossObj: object) {
        const centro_costoss: CCostosModel[] = [];
        if (centro_costossObj === null) {return []; }
  
        Object.keys(centro_costossObj).forEach(key => {
            const centro_costos: CCostosModel = centro_costossObj[key];
            centro_costoss.push(centro_costos);
        });
  
        return centro_costoss;
    }
  
    privilegios(){
  
      if(sessionStorage.getItem('id_rol')){
        this.rolService.getRolById(Number(sessionStorage.getItem('id_rol'))).subscribe(resp =>
          { 
            this.regulator = resp;
            console.log(resp);
          }
          );
          return this.regulator;
      }      
  
    }
  
  }
