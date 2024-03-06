import { Component } from '@angular/core';
import { dossier } from 'src/app/model/dossier';
import { DossierService } from 'src/app/service/dossier.service';
import { Document } from 'src/app/model/Document';
import { DocumentService } from 'src/app/service/document.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-list-dossier',
  templateUrl: './list-dossier.component.html',
  styleUrls: ['./list-dossier.component.css']
})
export class ListDossierComponent {

  dossiers: dossier[] = [];
  currentuser! : User ;
  editingDocument: Document | null = null;
  DocumentUpdated:string = "le document a ete bien modifiee";
  updated:boolean = false;


  constructor(private dossierService: DossierService , private Docserv:DocumentService) {}

  ngOnInit(): void {
     this.loadDossiers();
  }

  deleteDossier(dossier: dossier): void {
    if (confirm(`Voulez-vous vraiment supprimer le dossier "${dossier.nom}" ?`)) {
      this.dossierService.deleteDossier(dossier).subscribe({
        next: () => {
          console.log(`Le dossier "${dossier.nom}" a été supprimé.`);
          this.loadDossiers(); // Actualise la liste après la suppression
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du dossier:', error);
        }
      });
    }
  }

  private loadDossiers(): void {
    this.Docserv.getFirstCurrentUser().subscribe({
      next: user => {
        this.currentuser = user[0];
        if (this.currentuser) {
          console.log('User id:', this.currentuser.id);
          this.dossierService.getAllDossiers().subscribe({
            next: (dossiers: dossier[]) => {
              this.dossiers = dossiers.filter(dossier => dossier.idprop == this.currentuser.id);
                            this.dossiers.forEach(dossier => {
                console.log("Dossier :", dossier);
                console.log("Documents :");
                dossier.documents.forEach(doc => {
                  console.log("Chemin :", doc?._chemin?.emplacement);
                });
              });
            },
            error: (error) => {
              console.error('Erreur lors de la récupération des dossiers:', error);
            }
          });
        }
      },
      error: err => console.log('Erreur est survenu')
    });
  }

  deleteDocument(dossierId: string, documentId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce Document?')){
      console.log("identifiant",dossierId,documentId)
      this.dossierService.deleteDocumentInDossier(dossierId, documentId).subscribe();
      this.loadDossiers()
    }
   
  }

  editDocument(dossierId: string, documentId: string): void {
    const dossier = this.dossiers.find(d => d.id === dossierId);
    if (dossier) {
      const document = dossier.documents.find(doc => doc.id === documentId);
      if (document) {
        this.editingDocument = document;
        document.editMode = true;
      }
    }
  }

  saveDocument(dossierId: string, documentId: string): void {
    const dossier = this.dossiers.find(d => d.id === dossierId);
    if (dossier) {
      const document = dossier.documents.find(doc => doc.id === documentId);
      if (document) {
        document.editMode = false;
        this.dossierService.editDocumentInDossier(dossierId, document.id, this.editingDocument).subscribe(() => {
          console.log('Document mis à jour avec succès.');
           this.updated = true
           setTimeout(() => {
              this.updated = false
           }, 3000);
          this.loadDossiers();
        });
      }
    }
  }
    
     
 
}
