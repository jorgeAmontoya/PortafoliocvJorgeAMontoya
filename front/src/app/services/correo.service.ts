import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GeneralService } from './general.service';


@Injectable()
export class CorreoService {
  
    private url = '';        
    constructor(private http: HttpClient,
                private generalService: GeneralService) {
        this.url = generalService.genPath();             
    }

  postMessage(data) {
    console.log(data);        
    return this.http.post(this.url+`message`,data);       
  }
}