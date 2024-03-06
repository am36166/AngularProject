    
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): any {
      return this.authService.isAuthenticatedUser()
          .pipe(
              tap((isAuthenticated: any) => {
                  if (!isAuthenticated || !this.authService.isAdmin()) {
                      this.router.navigate(['/login']);
                  }
                  else if(isAuthenticated && !this.authService.isAdmin()){
                     this.router.navigate(['/List-Doc']);

                  }
              })
          );
  }
  
}
