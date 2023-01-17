import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrencyModel } from '../models/Currency.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';



@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

private url: string = "https://floatrates.com/daily/cop.json";

divisas;
private currencySource= new BehaviorSubject<any>('default');
currencyMessage=this.currencySource.asObservable();

constructor(private http: HttpClient){
    this.servidorFloatRates();
}

getCurrency(moneda: string){

    if(!this.divisas){this.currencySource.next(this.divisas)}
    else{
        if(moneda == "COP$"){this.currencySource.next({code:"COP"})}
        if((moneda == "USD$" && this.divisas)){this.currencySource.next(this.divisas.usd)}
        if((moneda == "EUR€" && this.divisas)){this.currencySource.next(this.divisas.eur)}
    }
}

servidorFloatRates(){
    fetch(this.url)
    .then(this.handleErrors)
    .then(respuesta => respuesta.json())
    .catch(error => console.log(error) )
    .then(respuestaDecodificada => {
        if(respuestaDecodificada){this.divisas = respuestaDecodificada;}
        else{ console.log("error con la api")}        
        //console.log(this.divisas);
    });
}
 handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}


}
