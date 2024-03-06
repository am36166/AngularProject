
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DossierService } from 'src/app/service/dossier.service';
import { dossier } from 'src/app/model/dossier';
import { Document } from 'src/app/model/Document';
import { DocumentService } from 'src/app/service/document.service';
import { User } from 'src/app/model/user';
import { v4 as uuidv4 } from 'uuid'; // Importez la fonction v4 de uuid

@Component({
  selector: 'app-cree-dossier',
  templateUrl: './cree-dossier.component.html',
  styleUrls: ['./cree-dossier.component.css']
})
export class CreeDossierComponent {
  dossierForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  currentuser!: User;

  constructor(private formBuilder: FormBuilder, private dossierService: DossierService , private Docserv:DocumentService) {
    this.dossierForm = this.formBuilder.group({
      nom: ['', Validators.required],
      documents: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
    this.Docserv.getFirstCurrentUser().subscribe({
      next: user => {
        this.currentuser = user[0];
        if (this.currentuser) {
          console.log('User id:', this.currentuser.id); 
        }
      },
      error: err => console.log('Erreur est survenu')
    });  }

  addDocument(): void {
    const documentFormGroup = this.formBuilder.group({
      id:uuidv4(),
      emplacement: ['', Validators.required],
      identificateur: ['', Validators.required],
      extension: ['', Validators.required],
      taille: ['', Validators.required],
      Idproprietaire: this.currentuser.id, 
      type: '', 
    });

    this.documents.push(documentFormGroup);
  }

  removeDocument(index: number): void {
    this.documents.removeAt(index);
  }

  submitForm(): void {
    if (this.dossierForm.valid) {
      const newDossier: dossier = {
        id: uuidv4(),
        idprop: this.currentuser.id,
        nom: this.dossierForm.value.nom,
        documents: this.dossierForm.value.documents.map((doc: any) => new Document(doc.id,doc.emplacement, doc.identificateur, doc.extension, doc.taille, doc.Idproprietaire, doc.type)
        ),
      };

      this.dossierService.addDossier(newDossier);
      this.dossierForm.reset();
      this.successMessage = 'Dossier créé avec succès!';
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
      this.errorMessage = ''; // Réinitialiser les messages d'erreur
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs du formulaire.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      this.successMessage = ''; // Réinitialiser le message de succès
    }
  }

  get documents(): any {
    return this.dossierForm.get('documents') as FormArray;
  }
}
