import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of, switchMap, tap } from 'rxjs';
import { Document } from 'src/app/model/Document';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:3000/documents';
  private apiendpoint = 'http://localhost:3000/currentuser';
  private documentsSubject: BehaviorSubject<Document[]> = new BehaviorSubject<Document[]>([]);
  public documents$: Observable<Document[]> = this.documentsSubject.asObservable();
  currentuser!: User| null;

  constructor(private http: HttpClient) {}

  fetchAllDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl);
  }
  

  addDocument(document: Document): void {
    this.http.post<Document>(this.apiUrl, document)
      .subscribe(() => this.fetchAllDocuments()); 
  }

  updateDocument(updatedDocument: Document): void {
    const url = `${this.apiUrl}/${updatedDocument.id}`;
    this.http.put<Document>(url, updatedDocument)
      .subscribe(() => {
        const currentDocuments = this.documentsSubject.value;
        const index = currentDocuments.findIndex(doc => doc.id === updatedDocument.id);
        if (index !== -1) {
          currentDocuments[index] = updatedDocument;
          this.documentsSubject.next(currentDocuments);
        }
      });
  }

  
  deleteDocument(document: Document): void {
    const url = `${this.apiUrl}/${document.id}`;
    this.http.delete(url)          
      .subscribe(() => this.fetchAllDocuments()); 
  }

  getAllDocuments(): Observable<Document[]> {
    return this.getFirstCurrentUser().pipe(
      switchMap((user: User[]) => {
        this.currentuser = user[0];
        console.log(this.currentuser)
        if (this.currentuser) {
          console.log('User id:', this.currentuser.id);
          return this.fetchAllDocuments().pipe(
            map((docs: Document[]) => docs.filter(doc => doc.Idproprietaire === this.currentuser?.id))
          );
        } else {
          return of([]);  
        }
      })
    );
  }
  
  getFirstCurrentUser(): Observable<any> {
    return this.http.get<any[]>(this.apiendpoint).pipe(
      tap(users => console.log('Current users retrieved from server:', users)),
      tap(users => {
        if (users && users.length > 0) {
          console.log('First current user:', users[0]);
        } else {
          console.log('Aucun utilisateur courant trouvé.');
        }
      })
    );
  }
}

