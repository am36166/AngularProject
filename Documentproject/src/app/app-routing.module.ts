import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './client/login/login.component';
import { CompteComponent } from './client/compte/compte.component';
import { LandingpageComponent } from './client/landingpage/landingpage.component';
import { AdminGuard } from './service/admin.guard';
import { HeaderComponent } from './client/header/header.component';
import { NavbarreComponent } from './client/navbarre/navbarre.component';
import { DocumentComponent } from './client/document/document.component';
import { CreerDocumentComponent } from './client/creer-document/creer-document.component';
import { ListDocumentComponent } from './client/list-document/list-document.component';
import { DossierComponent } from './client/dossier/dossier.component';
import { CreeDossierComponent } from './client/cree-dossier/cree-dossier.component';
import { ListDossierComponent } from './client/list-dossier/list-dossier.component';

const routes: Routes = [
  {path:"login" , component:LoginComponent},
  {path:"Inscription" , component:CompteComponent},
  {path:"Dashboard" , component:LandingpageComponent ,  canActivate: [AdminGuard]},
  {path:"header" , component:HeaderComponent},
  {path:"navbarre" , component:NavbarreComponent},
  {path:"Documents" , component:DocumentComponent},
  {path:"creeDocument" , component:CreerDocumentComponent},
  {path:"List-Doc" , component:ListDocumentComponent},
  {path:"dossiers" , component:DossierComponent},
  {path:"creeDossier" , component:CreeDossierComponent},
  {path:"list-Dossier" , component:ListDossierComponent},
  {path:'' , redirectTo:"/header" , pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
