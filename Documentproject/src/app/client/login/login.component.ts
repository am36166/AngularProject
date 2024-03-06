import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService , private router:Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.router.navigate(['/Dashboard']);
      } else {
         console.log("une erreur est survenu");
      }
    });
  }

}
