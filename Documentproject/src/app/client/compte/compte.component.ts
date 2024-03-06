import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent {
  inscriptionForm: FormGroup;
  AccountCreated: string = "Votre Compte a ete Bien Cree";
  Created: boolean = false

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.inscriptionForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      typeUtilisateur: ['', Validators.required],
      motDePasse: ['', Validators.required],
      statut: [true] 
    });
  }

  onSubmit() {
    if (this.inscriptionForm.valid) {
      const userData = this.inscriptionForm.value;
      const newUser = new User(
        userData.id,
        userData.nom,
        userData.prenom,
        userData.email,
        userData.typeUtilisateur,
        userData.motDePasse,
        userData.statut
      );

      this.userService.saveUser(newUser).subscribe(
        response => {
          console.log('Utilisateur enregistré avec succès:', response);
          this.Created = !this.Created
          setTimeout(() => {
            this.Created = !this.Created
          }, 2000);

          this.inscriptionForm.reset();
        },
        error => {
          console.error('Erreur lors de l\'enregistrement de l\'utilisateur:', error);
        }
      );
    }
  }
}
