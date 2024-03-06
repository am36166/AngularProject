import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/utilisateurs';

  constructor(private http:HttpClient ) { }

  saveUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  getUsersByRole(role: string): Observable<User[]> {
    const url = `${this.apiUrl}?typeUtilisateur=${role}`;
    return this.http.get<User[]>(url);
  }

  activerUtilisateur(user: User): Observable<any> {
    const url = `${this.apiUrl}/${user.id}`;
    const updatedUser = { ...user, statut: true };
    return this.http.patch(url, updatedUser);
  }

  desactiverUtilisateur(user: User): Observable<any> {
    const url = `${this.apiUrl}/${user.id}`;
    const updatedUser = { ...user, statut: false };
    return this.http.patch(url, updatedUser);
  }

  supprimerUtilisateur(userId: string): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete(url);
  }
  
}
