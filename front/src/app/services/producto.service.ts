import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductoModel } from '../models/producto.model';
import { GeneralService } from './general.service';

import { RolService } from '../services/rol.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ProductoService {
    private url = 'producto';
    private url1 = 'upload'
    regulator;    
    constructor(private http: HttpClient,
                private generalService: GeneralService,
                private rolService: RolService,
                private translate: TranslateService,) {
        //console.log('Servicio listo');
        this.url = generalService.genPath() + this.url;
        this.url1 = generalService.genPath() + this.url1;                 
        
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

    getProducto() {
      return this.http.get(this.url).pipe(
          map(resp => this.createArray(resp))
      );
  }

  getProductoById(id: number) {
      return this.http.get(this.url + `/${id}`);
  }

  postProducto(producto: ProductoModel) {
    this.privilegios();
      const headers = new HttpHeaders({
          'token': sessionStorage.getItem('token')
      });                
      console.log(this.regulator);
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
          return this.http.post(this.url, producto,{headers});
        }             
  }

  filterProducto(producto: ProductoModel) {        
      return this.http.post(this.url + '/filter', producto).pipe(
          map(resp => this.createArray(resp))
      );
  }

  putProducto(producto: ProductoModel) {
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
          return this.http.put(this.url, producto,{headers});
        }
  }

  putUpload(id: number, datasheet: FormData) {        
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
          return this.http.put(this.url1 + `/${id}`,datasheet,{headers});
        }        
  }

  deleteProducto(id: number) {
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

  private createArray(productosObj: object) {
      const productos: ProductoModel[] = [];
      if (productosObj === null) {return []; }

      Object.keys(productosObj).forEach(key => {
          const producto: ProductoModel = productosObj[key];
          productos.push(producto);
      });

      return productos;
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