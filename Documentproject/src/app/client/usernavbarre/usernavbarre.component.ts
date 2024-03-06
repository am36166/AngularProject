import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-usernavbarre',
  templateUrl: './usernavbarre.component.html',
  styleUrls: ['./usernavbarre.component.css']
})
export class UsernavbarreComponent {

  constructor(private logoutserv:AuthService){}

  se_deconnecter() {
    this.logoutserv.logout() ;
  }

}
