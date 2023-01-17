import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CorreoService } from 'src/app/services/correo.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  forma: FormGroup;

  constructor( private correoService : CorreoService) {
    this.forma = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z\u00C0-\u00FF ]{2,30}')]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      message: new FormControl('', [Validators.required, Validators.minLength(2),Validators.maxLength(500)])            
    });
   }

  //forma
  get nameNovalido(){
    return this.forma.get('name').invalid && this.forma.get('name').touched
  }
  get emailNovalido(){
    return this.forma.get('email').invalid && this.forma.get('email').touched
  }
  get messageNovalido(){
    return this.forma.get('message').invalid && this.forma.get('message').touched
  }

  ngOnInit() {
  }

  enviar(){
    
   /* if (this.forma.valid) {
      Swal.fire({
        title: 'Espere',
        text: 'Enviando mensaje',      
        allowOutsideClick: false,
        onOpen: function () {
          Swal.showLoading()
        }
      });

      this.correoService.postMessage(this.forma.value).subscribe(resp=>{
        console.log(resp);
        Swal.close();
        Swal.fire({
          title: "Mensaje enviado",
          text:  "El mensaje ha sido enviado con éxito",
          icon: 'success'
        });  
      },error =>{
        Swal.fire({
          title: "El mensaje no fue enviado",
          text:  "Se produjo un error con el sistema de mensajería",
          icon: 'error'
        });           
      });
 
    }else{
      Swal.fire({
        title: "Error",
        text:  "Los campos no cumplen el formato o están vacíos",
        icon: 'error'
      });   
    }*/
  }

}
