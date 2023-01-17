import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TipoTransaccionModel} from '../models/tipotransaccion.model';
import { GeneralService } from './general.service';

import { RolService } from '../services/rol.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class TipoTransaccionService {

  private url = 'tipo_transaccion';
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

    getTipoTransaccion() {

      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.get(this.url,{headers}).pipe(
            map(resp => this.createArray(resp))
        );
    }
    getTipoTransaccion_entradas() {

      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.get(this.url+'/get_entradas',{headers}).pipe(
            map(resp => this.createArray(resp))
        );
    }
    getTipoTransaccion_traslados() {

      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.get(this.url+"/traslados",{headers}).pipe(
            map(resp => this.createArray(resp))
        );
    }
    getTipoTransaccion_salidas() {

      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.get(this.url+"/get_salidas",{headers}).pipe(
            map(resp => this.createArray(resp))
        );
    }
  
    getTipoTransaccionById(id: number) {
      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.get(this.url + `/${id}`,{headers}).pipe(
              map(resp => this.createArray(resp))
          );
    }
  
    postTipoTransaccion(tipo_transaccion: TipoTransaccionModel) {
  
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
        return this.http.post(this.url, tipo_transaccion, {headers});
      }
  
    }
  
    filterTipoTransaccion(tipo_transaccion: TipoTransaccionModel) {
      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.post(this.url + '/filter', tipo_transaccion,{headers}).pipe(
            map(resp => this.createArray(resp))
        );
    }
  
    putTipoTransaccion(tipo_transaccion: TipoTransaccionModel) {
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
          return this.http.put(this.url, tipo_transaccion,{headers});
        }
    }
  
    deleteTipoTransaccion(id: number) {
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
  
    private createArray(tipo_transaccionesObj: object) {
        const tipo_transacciones: TipoTransaccionModel[] = [];
        if (tipo_transaccionesObj === null) {return []; }
  
        Object.keys(tipo_transaccionesObj).forEach(key => {
            const tipo_transaccion: TipoTransaccionModel = tipo_transaccionesObj[key];
            tipo_transacciones.push(tipo_transaccion);
        });
  
        return tipo_transacciones;
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
