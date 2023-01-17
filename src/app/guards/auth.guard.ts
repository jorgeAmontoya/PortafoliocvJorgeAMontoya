import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';
import { RrService } from '../services/rr.service';

import { RrModel} from '../models/rr.model';
import { Observable, of } from 'rxjs';

import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  enlaZar:boolean = false;  // regresa la autorización/negación de la ruta
  ruta_rol: RrModel = new RrModel(); // permite tomar el id de la ruta  

  constructor( public auth: UsuarioService,
    private translate: TranslateService,
    public router: Router, 
    public rol_Ruta: RrService, 
    private modalservice: NgbModal) { 
      //this.enlaZar= undefined;
    }

canActivate(route: ActivatedRouteSnapshot): Observable<boolean>  {
  
  const id_ruta = route.data.id_ruta; //captura la ruta  a la cual se intenta acceder
  //Protección de la rutas, requerimientos de roles y autenticación

    if(this.auth.estaAutenticado()) //verifica la autenticación en el sistema
    {
      this.auth.privilegios();
      if(id_ruta == undefined ){ //Para las rutas que solo requieren estar autenticado 
        return of(true);//Permite la navegación con true
      }
      else//Cuando se requiere estar autenticado y ademas tener la ruta asignada
      {
        this.ruta_rol.id_rol = Number(sessionStorage.getItem('id_rol'));
        this.ruta_rol.id_ruta= Number(id_ruta);
        this.rol_Ruta.filterRr(this.ruta_rol).subscribe(resp=>{//Filtra los datos de la cuenta y de la ruta, si la ruta se encuetnra asignada a la cuenta permite el logueo
          //console.log(resp[0]) 
          if(resp.length > 0)
          {
            /*console.log(resp.length, "hola mundo");*/ this.enlaZar = true;
            if(id_ruta == 1){this.router.navigateByUrl('/post-item');}
            if(id_ruta == 2){this.router.navigateByUrl('/bodes');}
            if(id_ruta == 3){this.router.navigateByUrl('/add_user');}
            if(id_ruta == 4){/*this.router.navigateByUrl('/edit_item/:id')*/;}
            if(id_ruta == 5){/*this.router.navigateByUrl('/bode/:id');*/}
            if(id_ruta == 6){/*this.router.navigateByUrl('/bode/:id');*/}
          }
          else
          { 
            if(this.ruta_rol.id_rol == 3){ this.router.navigateByUrl('/home'); }//Si se trata de un perfil de cliente
            else
            {//EN caso de ser un perfil de la empresa pero sin la ruta asignada
              //console.log("hola mundo"); 
              this.translate.get('unauthrole').subscribe((resp1: string)=>{
              this.translate.get('restrictedspace').subscribe((resp2: string)=>{
                Swal.fire({
                  title: resp1,
                  text: resp2,
                  icon: 'error'
                });
              });
              });
              //this.router.navigateByUrl('/login');
              this.router.navigateByUrl('/home');               
              return this.enlaZar = false;
    
            }
          }
        })

      }
      
    }else { //sino esta autenticado redirige a el login	      
      //this.router.navigateByUrl('/login');
      this.router.navigateByUrl('/home');      
      return of(false);
    }
        
    if(this.enlaZar == true){
      //this.router.navigateByUrl('/add_user');
      return of(true);    
    }else{      
      return of(false);
    }

	}

}