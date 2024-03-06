
export class User {
    id:string;
    nom: string;
    prenom: string;
    email: string;
    typeUtilisateur: string;
    motDePasse: string;
    statut: boolean; 
  
    constructor(id:string,nom: string, prenom: string, email: string, typeUtilisateur: string, motDePasse: string, statut: boolean) {
      this.id = id ;
      this.nom = nom;
      this.prenom = prenom;
      this.email = email;
      this.typeUtilisateur = typeUtilisateur;
      this.motDePasse = motDePasse;
      this.statut = statut;
    }
  }
  