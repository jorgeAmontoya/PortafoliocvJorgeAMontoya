import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CategoriaModel } from '../models/categoria.model';
import { GeneralService } from './general.service';

import { RolService } from '../services/rol.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url = 'categoria';
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

    getCategoria() {

      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.get(this.url,{headers}).pipe(
            map(resp => this.createArray(resp))
        );
    }
  
    getCategoriaById(id: number) {
      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
      return this.http.get(this.url + `/${id}`,{headers}).pipe(
          map(resp => this.createArray(resp))
      );;
    }
  
    postCategoria(categoria: CategoriaModel) {
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
          return this.http.post(this.url, categoria,{headers});
        }
    
    }
  
    filterCategoria(categoria: CategoriaModel) {
      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });
        return this.http.post(this.url + '/filter', categoria,{headers}).pipe(
            map(resp => this.createArray(resp))
        );
    }
  
    putCategoria(categoria: CategoriaModel) {
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
          return this.http.put(this.url, categoria,{headers});
        }
    }
  
    deleteCategoria(id: number) {
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
        return this.http.delete(this.url + `/${id}`,{headers});
      }
        
    }
  
    private createArray(categoriasObj: object) {
        const categorias: CategoriaModel[] = [];
        if (categoriasObj === null) {return []; }
  
        Object.keys(categoriasObj).forEach(key => {
            const categoria: CategoriaModel = categoriasObj[key];
            categorias.push(categoria);
        });
  
        return categorias;
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