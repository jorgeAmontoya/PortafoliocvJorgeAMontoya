
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TransaccionModel } from '../models/transaccion.model';
import { GeneralService } from './general.service';

import { RolService } from '../services/rol.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  private url = 'transaccion_inv';
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

    getTransaccion() {

      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.get(this.url,{headers}).pipe(
            map(resp => this.createArray(resp))
        );
    }
  
    getTransaccionById(id: number) {
      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.get(this.url + `/${id}`,{headers}).pipe(
              map(resp => this.createArray(resp))
          );
    }
  
    post2Transaccion(transaccion: TransaccionModel, movimiento) {
      console.log(movimiento)
      if (movimiento.tipo == "ingreso") {
        console.log("ingreso");
        transaccion.id_tipo_transaccion=12
      } else if (movimiento.tipo == "salida") {
        console.log("salida");
        transaccion.id_tipo_transaccion=14
      } else if (movimiento.tipo == "traslado_parcial") {
        console.log("traslado");
        transaccion.id_tipo_transaccion=9
      }

      transaccion.iva= "99"
      transaccion.cliente= "900718445"
      transaccion.total_descuento= "0"
      transaccion.iva= "0"
      transaccion.id_bodega_destino = transaccion.id_bodega
      //transaccion.id_tipo_transaccion=2// poner por defecto, entrada, salida, traslado (para esta ultima tener en cuenta la igualdad de referencia destino)
      transaccion.id_concepto_pago=1
      transaccion.id_centro_costos=1//centro de costos? una por defecto temporal

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
        return this.http.post(this.url, transaccion, {headers});
      }
  
    }

    postTransaccion(transaccion: TransaccionModel) {

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
        return this.http.post(this.url, transaccion, {headers});
      }
  
    }
    
  
    filterTransaccion(transaccion: TransaccionModel) {
      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.post(this.url + '/filter', transaccion,{headers}).pipe(
            map(resp => this.createArray(resp))
        );
    }
  
    putTransaccion(transaccion: TransaccionModel) {
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
          return this.http.put(this.url, transaccion,{headers});
        }
    }
  
    deleteTransaccion(id: number) {
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
  
    private createArray(transaccionObj: object) {
        const transacciones: TransaccionModel[] = [];
        if (transaccionObj === null) {return []; }
  
        Object.keys(transaccionObj).forEach(key => {
            const transaccion: TransaccionModel = transaccionObj[key];
            transacciones.push(transaccion);
        });
  
        return transacciones;
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
