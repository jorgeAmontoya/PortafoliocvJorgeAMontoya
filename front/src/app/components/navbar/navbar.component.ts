import { Component, OnInit, Input } from '@angular/core';
import {UsuarioService} from '../../services/usuario.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CurrencyService } from '../../services/currency.service';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $ :any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'c-deg-controller-front';
  langs: string[]=[];

  flag="es";
  flag_show="Español";

  moneda="COP$";
  registro;

  Name: any;
  id_rol: any;
  correo: any;

  usuario: UsuarioModel = new UsuarioModel();
  forma: FormGroup;

  session: boolean = false;
  Correo: string;
  constructor(private auth:UsuarioService, 
              private router: Router, 
              private translate: TranslateService,
              private currency:CurrencyService,
              private modalservice: NgbModal)
              { 
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    this.translate.addLangs(['es', 'en', 'fr', 'de']);
    this.langs = this.translate.getLangs();
    this.forma = new FormGroup({
      correo: new FormControl('')
    });

  }

  ngOnInit() {

  /*$(function() {
    $(document).click(function (event) {
      (<any>$('.navbar-collapse')).collapse('hide');
    });
  });*/

  $('#sideMenu a').on('click', function (e) {
    e.preventDefault();
    $('#sideMenu a').not(this).removeClass('active')
    $(this).toggleClass('active');
    <any>$('#sidebar, #content').toggleClass('active');
  })

  /*$('.menu-link').on('click', function(event) {
    $('.nav').removeClass('active');
    $(this).addClass('active');
    console.log("prueba");
  });*/
  

  /*$(function() {
    $(document).ready(function (event) {


    <any>$('#sidebarCollapse').on('click', function () {
      <any>$('#sidebar, #content').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });

    });
  });*/

  $(function() {
    $(document).ready(function (event) {


    <any>$('#sidebarCollapse').on('click', function () {
      <any>$('#sidebar, #content').toggleClass('active');
    });

    });
  });

  /*$(document).ready(function () {
    (<any>$("#sidebar")).mCustomScrollbar({
          theme: "minimal"
      });

      $('#sidebarCollapse').on('click', function () {
          $('#sidebar, #content').toggleClass('active');
          $('.collapse.in').toggleClass('in');
          $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      });
  });*/

  this.auth.currentMessage.subscribe(message =>{
    if(message){
      this.Name = sessionStorage.getItem('nombre');
      this.id_rol = Number(sessionStorage.getItem('id_rol'));
      this.Correo = sessionStorage.getItem('correo');
      this.session= true;
    }
  });

  this.currency.currencyMessage.subscribe(resp=>{ 
    if(resp == 'default'){ console.log("default"); }
    else{
      if(resp){console.log(resp); this.registro = resp.code;}
      else{
        this.moneda="COP$";
        this.translate.get('currencyerror').subscribe((resp1: string)=>{          
        this.translate.get('notinternet').subscribe((resp2: string)=>{      
          Swal.fire({
          title: resp1,
          text: resp2,
          icon: 'error'
          });
        });}); 
      }
    }     

    });
  }
  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
  goback(){
    window.history.back();
  }

  changeLang(lang: string){
    //console.log(lang);
    if(lang == "us"){lang="en"; this.translate.use(lang);}
    else{
      this.translate.use(lang);
    }
    
  }

  getCurrency(moneda: string){
    this.currency.getCurrency(moneda);
   // console.log(this.registro);
  }
    

}
