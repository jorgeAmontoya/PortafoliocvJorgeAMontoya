import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactoComponent } from './components/contacto/contacto.component';
//import { QrcodeComponent } from './components/qrcode/qrcode.component';

const APP_ROUTES: Routes =
[            
    
    { path: 'home', component: HomeComponent },    
    { path: 'Skills', component: SkillsComponent },
    { path: 'Experience', component: ExperienceComponent },
    { path: 'Education', component: EducationComponent },
    { path: 'Portfolio', component: PortfolioComponent },
    { path: 'Contacto', component: ContactoComponent },
    { path: 'About', component: AboutComponent },
    {path: '**', pathMatch: 'full', redirectTo: 'About'},
    {path: '', pathMatch: 'full', redirectTo: 'About'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});
