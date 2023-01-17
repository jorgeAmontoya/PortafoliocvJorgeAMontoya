import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BodegaModel } from '../models/bodega.model';
import { GeneralService } from './general.service';

import { RolService } from '../services/rol.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class BodegaService {

  private url = 'bodega';
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

    getBodega() {

      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.get(this.url,{headers}).pipe(
            map(resp => this.createArray(resp))
        );
    }
  
    getBodegaById(id: number) {
      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.get(this.url + `/${id}`,{headers}).pipe(
              map(resp => this.createArray(resp))
          );
    }
  
    postBodega(bodega: BodegaModel) {
  
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
        return this.http.post(this.url, bodega, {headers});
      }
  
    }
  
    filterBodega(bodega: BodegaModel) {
      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.post(this.url + '/filter', bodega,{headers}).pipe(
            map(resp => this.createArray(resp))
        );
    }
  
    putBodega(bodega: BodegaModel) {
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
          return this.http.put(this.url, bodega,{headers});
        }
    }
  
    deleteBodega(id: number) {
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


    GetCodeBode(id: number) {
    const headers = new HttpHeaders({
      'token': sessionStorage.getItem('token')
    });
      return this.http.get(this.url +'/code'+ `/${id}`,{headers}).pipe(
        map(resp => this.createArray(resp))
      );
  }
  
    private createArray(bodegasObj: object) {
        const bodegas: BodegaModel[] = [];
        if (bodegasObj === null) {return []; }
  
        Object.keys(bodegasObj).forEach(key => {
            const bodega: BodegaModel = bodegasObj[key];
            bodegas.push(bodega);
        });
  
        return bodegas;
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
