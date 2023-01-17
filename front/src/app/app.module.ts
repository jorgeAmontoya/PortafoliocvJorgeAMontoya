import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { CommonModule, CurrencyPipe} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import  {MatCurrencyFormatModule} from 'mat-currency-format';
import {IMaskModule} from 'angular-imask';


import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { ZXingScannerModule } from '@zxing/ngx-scanner';


// components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components//navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactoComponent } from './components/contacto/contacto.component';



import { NgxBarcodeModule } from 'ngx-barcode';
import {TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { NgxPrinterModule } from 'ngx-printer';


// routes
import { APP_ROUTING } from './app.routes';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


// servicios
import { ProductoService } from './services/producto.service';
import { UtilService } from './services/util.service';
import { BpService } from './services/bp.service';
import { BodegaService } from './services/bodega.service';
import { CategoriaService } from './services/categoria.service';
import { RolService } from './services/rol.service';
import { RutaService } from './services/ruta.service';
import { UsuarioService } from './services/usuario.service';
import { RrService } from './services/rr.service';
import { PuService } from './services/pu.service';
import { CurrencyService } from './services/currency.service';
import { ConceptoPagoService } from './services/conceptopago.service';
import { TipoTransaccionService } from './services/tipotransaccion.services';
import { CentroCostosService } from './services/ccostos.service';
import { TransaccionService } from './services/transaccion.service';
import { CorreoService } from './services/correo.service';



import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';











export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http , './assets/i18n/', '.json');
}


@NgModule({
  declarations: [    
    AppComponent,    
    FooterComponent,
    HomeComponent,
    NavbarComponent,                                                
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    EducationComponent,
    PortfolioComponent,
    ContactoComponent
  ],
  imports: [
    BrowserModule,
    ZXingScannerModule,
    IMaskModule,
    CommonModule,
    APP_ROUTING,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,    
    NgxBarcodeModule,    
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCurrencyFormatModule,
    NgxPrinterModule.forRoot({
      printOpenWindow: true
    }),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }) 
  ],
  providers: [
    ProductoService,
    CurrencyPipe,
    UtilService,
    BpService,
    BodegaService,
    CategoriaService,
    RolService,
    RutaService,
    UsuarioService,
    RrService,
    PuService,
    CurrencyService,
    ConceptoPagoService,
    TipoTransaccionService,
    CentroCostosService,
    TransaccionService,
    CorreoService
  ],
  entryComponents: [
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
