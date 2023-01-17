import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UsuarioModel } from '../models/usuario.model';
import { GeneralService } from './general.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
//import { ConsoleReporter } from 'jasmine';

import { RolService } from '../services/rol.service';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'usuario';
  userToken: string;
  regulator;

  private messageSource = new BehaviorSubject<boolean>(false);
  currentMessage = this.messageSource.asObservable();  

  constructor(private http: HttpClient,
              private generalService: GeneralService,
              private rolService: RolService,
              private translate: TranslateService,
              private router: Router,) {
    //console.log('Servicio listo');
    this.url = generalService.genPath() + this.url;
    this.leerToken();

    if(sessionStorage.getItem('id_rol')){
      this.messageSource.next(true);
      this.rolService.getRolById(Number(sessionStorage.getItem('id_rol'))).subscribe(resp =>
        { 
          this.regulator = resp;
          //console.log(this.regulator);
        }
        );
        return this.regulator; //contiene los privilegios del rol autenticado
    }

    }

    changeMessage(){
      this.messageSource.next(true)
    }

    getUsuario() {
      const headers = new HttpHeaders({
        'token': sessionStorage.getItem('token')
      });
        return this.http.get(this.url,{headers}).pipe(
              map(resp => this.createArray(resp))
          );
    }
  
    getUsuarioById(id: number) {
      const headers = new HttpHeaders({
        'token': sessionStorage.getItem('token')
      });
        return this.http.get(this.url + `/${id}`,{headers});
    }
  
    postUsuario(usuario: UsuarioModel) {
      const headers = new HttpHeaders({
        'token': sessionStorage.getItem('token')
      });      
      
      this.privilegios();
        if(this.regulator[0].can_create_user == false){
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
          return this.http.post(this.url, usuario,{headers});
        }      
    }
  
    filterUsuario(usuario: UsuarioModel) {
      const headers = new HttpHeaders({
        'token': sessionStorage.getItem('token')
      });
        return this.http.post(this.url + '/filter', usuario,{headers}).pipe(
            map(resp => this.createArray(resp))
        );
    }
  
    putUsuario(usuario: UsuarioModel) {
      const headers = new HttpHeaders({
        'token': sessionStorage.getItem('token')
      });
      
      this.privilegios();
        if(this.regulator[0].can_update_user == false){
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
          return this.http.put(this.url, usuario,{headers});
        }
    }
  
    putUsuarioContrasena(id: number,pass: any){
      const headers = new HttpHeaders({
        'token': sessionStorage.getItem('token')
      });
      //console.log(id, pass, "hola mundo");
        return this.http.put(this.url + `/${id}` +'/pass',pass,{headers});
    } //usuario/:id/pass' 
    //return this.http.put(this.url + `/${id}` + `/pass?pass=`, pass,{headers});
    //http://localhost:4001/usuario/2/pass?pass=1234567890
  
    deleteUsuario(id: number) {
      const headers = new HttpHeaders({
        'token': sessionStorage.getItem('token')
      });      
      this.privilegios();
        if(this.regulator[0].can_delete_user == false){
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
  
    private createArray(usuariosObj: object) {
        const usuarios: UsuarioModel[] = [];
        if (usuariosObj === null) {return []; }
  
        Object.keys(usuariosObj).forEach(key => {
            const usuario: UsuarioModel = usuariosObj[key];
            usuarios.push(usuario);
        });
  
        return usuarios;
    }
  
    login( usuario: UsuarioModel ){
        const authData = {
            ...usuario,
            returnSecureToken: true
        };
  
        return this.http.post(this.url+'/auth', authData).pipe(
          map( resp => {          
            if(resp['token']){
              this.guardarToken( resp['token'] );
            }            
            return resp;
          })
        );
    
    }

    CreateQR( usuario: UsuarioModel ){
      const authData = {
          ...usuario,
          returnSecureToken: true
      };

      return this.http.post(this.url+'/auth', authData).pipe(
        map( resp => {                  
          return resp;
        })
      );
  
    }
  
    private guardarToken( token: string ) {
  
      this.userToken = token;
      sessionStorage.setItem('token', token);
      //console.log('El tokes es:')
      //console.log(this.userToken)
  
      let hoy = new Date();
      hoy.setSeconds( (3600)*9 );
  
      sessionStorage.setItem('expira', hoy.getTime().toString() );
  
  
    }
  
    leerToken() {
  
      if ( sessionStorage.getItem('token') ) {
        this.userToken = sessionStorage.getItem('token');
      } else {
        this.userToken = '';
      }
  
      return this.userToken;
  
    }
  
    estaAutenticado(): boolean {//permite verificar la autenticación del token
  
      if ( this.userToken.length < 2 ) {
        return false;
      }
  
      const expira = Number(sessionStorage.getItem('expira'));
      const expiraDate = new Date();
      expiraDate.setTime(expira);
  
      if ( expiraDate > new Date() ) {
        return true;
      } else {//Si el token se vence, reinicia la aplicación web y borra el sessionStorage
        var n = sessionStorage.length;
        while(n--) {
          var key = sessionStorage.key(n);
          
            sessionStorage.removeItem(key);
          }
        this.router.navigateByUrl('/home');
        location.reload(); 
        return false;
      }
  
  
    }
  
    logout(){
      sessionStorage.removeItem('token');    
      this.userToken = '';
      
      var n = sessionStorage.length;
      while(n--) {
        var key = sessionStorage.key(n);
        
          sessionStorage.removeItem(key);
        }
      this.router.navigateByUrl('/home');
      location.reload(); 
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
