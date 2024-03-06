import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from 'src/app/service/document.service';
import { Document } from 'src/app/model/Document';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-creer-document',
  templateUrl: './creer-document.component.html',
  styleUrls: ['./creer-document.component.css']
})
export class CreerDocumentComponent implements OnInit {
  documentForm: FormGroup;
  successMessage!: string;
  errorMessage!: string;
  currentuser!: User| null;

  constructor(private formBuilder: FormBuilder, private documentService: DocumentService , private authService:AuthService) {
    this.documentForm = this.formBuilder.group({
      emplacement: ['', Validators.required],
      identificateur: ['', Validators.required],
      extension: ['', Validators.required],
      taille: ['', Validators.required],
      Idproprietaire: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  initDocumentForm(): void {
    console.log('Initializing document form with user:', this.currentuser);
    this.documentForm.patchValue({
      emplacement: '',  
      identificateur: '',
      extension: '',
      taille: '',
      Idproprietaire:this.currentuser?.id ||'',  
      type: '',
    });
  }

      ngOnInit(): void {
        this.documentService.getFirstCurrentUser().subscribe({
          next: user => {
            this.currentuser = user[0];
            if (this.currentuser) {
              this.initDocumentForm();
              console.log('User id:', this.currentuser.id); 
            }
          },
          error: err => console.log('Erreur est survenu')
        });
      }


    

  submitForm(): void {
    if (this.documentForm.valid) {
      const newDocument: Document = this.documentForm.value;
      this.documentService.addDocument(newDocument);
      this.documentForm.reset();
      this.successMessage = 'Document créé avec succès!';
      setTimeout(() =>{
        this.successMessage = '';
      },3000)
      this.errorMessage = ''; 
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs du formulaire.';
      setTimeout(() =>{
        this.errorMessage = '';
      },3000)
      this.successMessage = ''; 
    }
  }
}
