import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { dossier } from 'src/app/model/dossier';
import { Document } from 'src/app/model/Document'

@Injectable({
  providedIn: 'root'
})
export class DossierService {
  private apiDossiersUrl = 'http://localhost:3000/dossiers';

  private dossiersSubject: BehaviorSubject<dossier[]> = new BehaviorSubject<dossier[]>([]);
  public dossiers$: Observable<dossier[]> = this.dossiersSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchAllDossiers(): Observable<dossier[]> {
    return this.http.get<dossier[]>(this.apiDossiersUrl);
  }

  addDossier(dossier: dossier): void {
    this.http.post<dossier>(this.apiDossiersUrl, dossier)
      .subscribe(() => this.fetchAllDossiers()); 
  }

  updateDossier(updatedDossier: dossier): void {
    const url = `${this.apiDossiersUrl}/${updatedDossier.id}`;
    this.http.put<dossier>(url, updatedDossier)
      .subscribe(() => {
        const currentDossiers = this.dossiersSubject.value;
        const index = currentDossiers.findIndex(dossier => dossier.id === updatedDossier.id);
        if (index !== -1) {
          currentDossiers[index] = updatedDossier;
          this.dossiersSubject.next(currentDossiers);
        }
      }); 
  }

  deleteDossier(dossier: dossier): Observable<void> {
    const url = `${this.apiDossiersUrl}/${dossier.id}`;
    return this.http.delete<void>(url);
  }

  fetchDossierWithDocuments(dossierId: string): Observable<any> {
    const url = `${this.apiDossiersUrl}/${dossierId}`;
    return this.http.get<any>(url);
  }

  getAllDossiers(): Observable<dossier[]> {
    return this.fetchAllDossiers().pipe(
      tap((dossiers: dossier[]) => this.dossiersSubject.next(dossiers))
    );
  }

  deleteDocumentInDossier(dossierId: string, documentId: string): Observable<any> {
    return this.fetchDossierWithDocuments(dossierId).pipe(
      switchMap((dossier) => {
        if (!dossier) {
          return throwError("Dossier non trouvé");
        }
  
        const documentIndex = dossier.documents.findIndex((doc: { id: string; }) => doc.id === documentId);
  
        console.log("position:", documentIndex);
        console.log("identifiantdoc:", documentId);
        console.log("tableau:", dossier.documents);
        console.log("Dossiers : ", dossier);
  
        if (documentIndex === -1) {
          return throwError("Document non trouvé dans le dossier");
        }
  
        const documentToDelete = dossier.documents[documentIndex];
          dossier.documents.splice(documentIndex, 1);
          const url = `${this.apiDossiersUrl}/${dossierId}`;
        return this.http.put<void>(url, dossier).pipe(
          switchMap(() => this.http.delete<void>(`${this.apiDossiersUrl}/${documentToDelete.id}`))
        );
      }),
      switchMap(() => this.fetchAllDossiers())
    );
  }

  editDocumentInDossier(dossierId: string, documentId: string, updatedDocument: any): Observable<any> {
    return this.fetchDossierWithDocuments(dossierId).pipe(
      switchMap((dossier) => {
        if (!dossier) {
          return throwError("Dossier non trouvé");
        }

        const documentIndex = dossier.documents.findIndex((doc: { id: string; }) => doc.id === documentId);

        if (documentIndex === -1) {
          return throwError("Document non trouvé dans le dossier");
        }

        dossier.documents[documentIndex] = updatedDocument;

        const url = `${this.apiDossiersUrl}/${dossierId}`;
        return this.http.put<void>(url, dossier).pipe(
          catchError((error) => {
            console.error(error);
            return throwError("Erreur lors de la mise à jour du dossier");
          })
        );
      }),
      switchMap(() => this.fetchAllDossiers())
    );
  }

 
  
}