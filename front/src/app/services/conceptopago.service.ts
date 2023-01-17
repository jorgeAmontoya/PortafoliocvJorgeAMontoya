import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConceptoPagoModel } from '../models/conceptopago.model';
import { GeneralService } from './general.service';

import { RolService } from '../services/rol.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ConceptoPagoService {
    private url = 'concepto_pago';
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

    getConceptoPago() {
      const headers = new HttpHeaders({
        'token': sessionStorage.getItem('token')
        });
      return this.http.get(this.url,{headers}).pipe(
          map(resp => this.createArray(resp))
      );
  }

  getConceptoPagoById(id: number) {
    const headers = new HttpHeaders({
      'token': sessionStorage.getItem('token')
    });
      return this.http.get(this.url + `/${id}`,{headers});
  }

  postConceptoPago(conceptopago: ConceptoPagoModel) {
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
        return this.http.post(this.url, conceptopago,{headers});
      }           
  }
  

  filterConceptoPago(conceptopago: ConceptoPagoModel) {        
      return this.http.post(this.url + '/filter', conceptopago).pipe(
          map(resp => this.createArray(resp))
      );
  }

  putConceptoPago(conceptopago: ConceptoPagoModel) {
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
          return this.http.put(this.url, conceptopago,{headers});
        }
  }

  deleteConceptoPago(id: number) {
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

  private createArray(conceptopagosObj: object) {
      const conceptopagos: ConceptoPagoModel[] = [];
      if (conceptopagosObj === null) {return []; }

      Object.keys(conceptopagosObj).forEach(key => {
          const conceptopago: ConceptoPagoModel = conceptopagosObj[key];
          conceptopagos.push(conceptopago);
      });

      return conceptopagos;
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