import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(localStorage.getItem('authenticatedUser') !== null);
  private authenticatedUser: any;

  sendUserDataToServer(userData: any): Observable<any> {
    const currentUserEndpoint = 'http://localhost:3000/currentuser';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(currentUserEndpoint, userData, { headers }).pipe(
      map(response => {
        console.log('User data sent to server:', response);
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error sending user data to server:', error);
        return throwError(error);
      })
    );
  }
  
  constructor(private http: HttpClient , private router:Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.get<User[]>('http://localhost:3000/utilisateurs')
      .pipe(
        tap((users: User[]) => {
          console.log('Users from API:', users);
          console.log(username,password)
          const matchingUsers = users.filter(user =>
            user.nom.toLowerCase() === username.toLowerCase() && user.motDePasse === password
          );         console.log(matchingUsers)
          if (matchingUsers.length > 0 && matchingUsers[0].statut ) {
            const user = matchingUsers[0];
            console.log('Authenticated User:', user);
            this.sendUserDataToServer(user).subscribe(
              response => console.log('User data sent to server:', response),
              error => console.error('Error sending user data to server:', error)
            );
            this.setAuthenticatedUser(user)
            this.isAuthenticated.next(true);
            this.redirectBasedOnRole();
          } else {
            console.log('Authentication failed. No matching users found.');
            this.isAuthenticated.next(false);
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Authentication error:', error);
          this.isAuthenticated.next(false);
          return throwError(error);
        })
      );
  }
  
  deleteAllUsers(): Observable<any> {
    const currentUserEndpoint = 'http://localhost:3000/currentuser';

    return this.http.get<User[]>(currentUserEndpoint).pipe(
      tap(users => console.log('Current users retrieved from server:', users)),
      concatMap(users => {
        if (users && users.length > 0) {
          const deleteRequests: Observable<any>[] = [];

          for (const user of users) {
            const deleteEndpoint = `${currentUserEndpoint}/${user.id}`;
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
            });

            deleteRequests.push(
              this.http.delete(deleteEndpoint, { headers }).pipe(
                tap(response => console.log(`User ${user.id} deleted on server:`, response)),
                catchError((error: HttpErrorResponse) => {
                  console.error(`Error deleting user ${user.id} on server:`, error);
                  return throwError(error);
                })
              )
            );
          }
          return this.runSequentialRequests(deleteRequests);
        } else {
          return [];
        }
      })
    );
  }

  private runSequentialRequests(requests: Observable<any>[]): Observable<any> {
    return requests.reduce((acc, request) => acc.pipe(concatMap(() => request)), of(null));
  }


  logout(): void {
    console.log('Logout initiated');
    this.deleteAllUsers().subscribe(
      response => {
        console.log('All users deleted during logout:', response);
        this.isAuthenticated.next(false);
        window.location.href = '/login';
      },
      error => console.error('Error deleting all users during logout:', error)
    );
  }
  
  
  isAuthenticatedUser(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  getAuthenticatedUser(): User | null {
    return this.authenticatedUser;
  }

  isAdmin(): boolean {
    return this.authenticatedUser && this.authenticatedUser.typeUtilisateur == 'admin';
  }

  setAuthenticatedUser(user: User): void {
    this.authenticatedUser = user;
    localStorage.setItem('authenticatedUser', JSON.stringify(user));
  }

  private redirectBasedOnRole(): void {
    const user = this.authenticatedUser;
  
    if (user) {
      console.log('Detected role:', user.typeUtilisateur);
      if (user.typeUtilisateur === 'admin') {
        console.log('Redirecting to Dashboard');
        this.router.navigate(['/Dashboard']);
      } else {
        console.log('Redirecting to List-Doc');
        window.location.href = '/List-Doc';
      }
    }
  } 
}
