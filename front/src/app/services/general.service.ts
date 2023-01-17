import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {Md5} from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  
  //Descomentar para modo local  
  /*httpSigned: string = 'http';
  httpUnsigned: string = 'http';
  ipDesarrollo: string = 'localhost';
  ipProduccion: string = 'localhost';
  puerto: string = '4001';*/

  //Descomentar para modo producción
  httpSigned: string = 'https';
  httpUnsigned: string = 'https';
  ipDesarrollo: string = 'app-jdportafolio.herokuapp.com';
  ipProduccion: string = 'app-jdportafolio.herokuapp.com';
  puerto: string = '4000';

  selIp: boolean = environment.production;
  selHttp: boolean = false;

  constructor() { }
  //para heroku
  genPath():string {
    if(this.selHttp){
      let dir: string = `${this.httpSigned}://`;
      if (this.selIp) {
        dir += `${this.ipProduccion}/`;
        return dir;
      }else{
        dir += `${this.ipDesarrollo}/`;
        return dir;
      }
    }else{
      let dir: string = `${this.httpUnsigned}://`;
      if (this.selIp) {
        dir += `${this.ipProduccion}/`;
        return dir;
      }else{
        dir += `${this.ipDesarrollo}/`;
        return dir;
      }
    }
  }

  //pruebas locales
  /*genPath():string {
    if(this.selHttp){
      let dir: string = `${this.httpSigned}://`;
      if (this.selIp) {
        dir += `${this.ipProduccion}:${this.puerto}/`;
        return dir;
      }else{
        dir += `${this.ipDesarrollo}:${this.puerto}/`;
        return dir;
      }
    }else{
      let dir: string = `${this.httpUnsigned}://`;
      if (this.selIp) {
        dir += `${this.ipProduccion}:${this.puerto}/`;
        return dir;
      }else{
        dir += `${this.ipDesarrollo}:${this.puerto}/`;
        return dir;
      }
    }
  }*/

  genBarCode(){
    
    let now = new Date();
    let nowNumber = now.getTime();
    //console.log(nowNumber);
    //return Md5.hashStr(nowNumber.toString()).toString();
    return Math.round(nowNumber/10);
    
  }
}
