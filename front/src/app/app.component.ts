import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'c-deg-controller-front';
  langs: string[]=[];

  constructor (private translate: TranslateService,)
  {
    this.translate.setDefaultLang('es');
    this.translate.use('es');
    this.translate.addLangs(['es', 'en', 'fr', 'de']);
    this.langs = this.translate.getLangs();
    //console.log(this.langs)
    //const browserLang = translate.getBrowserLang();
    //translate.use(browserLang.match(/es|en|fr|de/) ? browserLang: 'es');
    
  }

  changeLang(lang: string){
    this.translate.use(lang);
  }

}
