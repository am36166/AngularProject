import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './client/login/login.component';
import { CompteComponent } from './client/compte/compte.component';
import { LandingpageComponent } from './client/landingpage/landingpage.component';
import { AdminGuard } from './service/admin.guard';
import { HeaderComponent } from './client/header/header.component';
import { NavbarreComponent } from './client/navbarre/navbarre.component';
import { DocumentComponent } from './client/document/document.component';
import { CreerDocumentComponent } from './client/creer-document/creer-document.component';
import { NavbarreDocComponent } from './client/navbarre-doc/navbarre-doc.component';
import { ListDocumentComponent } from './client/list-document/list-document.component';
import { UsernavbarreComponent } from './client/usernavbarre/usernavbarre.component';
import { DossierComponent } from './client/dossier/dossier.component';
import { ListDossierComponent } from './client/list-dossier/list-dossier.component';
import { CreeDossierComponent } from './client/cree-dossier/cree-dossier.component';
import { NavbarreDossierComponent } from './client/navbarre-dossier/navbarre-dossier.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CompteComponent,
    LandingpageComponent,
    HeaderComponent,
    NavbarreComponent,
    DocumentComponent,
    CreerDocumentComponent,
    NavbarreDocComponent,
    ListDocumentComponent,
    UsernavbarreComponent,
    DossierComponent,
    ListDossierComponent,
    CreeDossierComponent,
    NavbarreDossierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [ AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
