import { Component } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {

  
  users: User[] = [];
  feedbackMessage: string = ''; 

  constructor(private userService: UserService , private authserv:AuthService) { }

  ngOnInit(): void {
    this.getUsersByRole();
  }

  getUsersByRole() {
    this.userService.getUsersByRole('utilisateur').subscribe(
      (data: User[]) => {
        this.users = data;
      },
      error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    );
  }

  activerUtilisateur(user: User) {
    this.userService.activerUtilisateur(user).subscribe(
      () => {
        this.getUsersByRole();
        this.feedbackMessage = 'Utilisateur activé avec succès.';
        this.clearFeedbackMessageAfterDelay()

        
      },
      error => {
        console.error('Erreur lors de l\'activation de l\'utilisateur:', error);
      }
    );
  }

  desactiverUtilisateur(user: User) {
    this.userService.desactiverUtilisateur(user).subscribe(
      () => {
        this.getUsersByRole();
        this.feedbackMessage = 'Utilisateur désactivé avec succès.';
        this.clearFeedbackMessageAfterDelay()


      },
      error => {
        console.error('Erreur lors de la désactivation de l\'utilisateur:', error);
      }
    );
  }
  supprimerUtilisateur(user: User) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur?')) {
      this.userService.supprimerUtilisateur(user.id).subscribe(
        () => {
          this.getUsersByRole();
          this.feedbackMessage = 'Utilisateur supprimé avec succès.';
          this.clearFeedbackMessageAfterDelay()

        },
        error => {
          console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        }
      );
    }
  }

  clearFeedbackMessageAfterDelay() {
    setTimeout(() => {
      this.feedbackMessage= '';
    }, 3000); 

  }

  se_deconnecter(){
    this.authserv.logout() ;
  }
}
