import { Validation } from "./Validation";

export class Chemin {

    emplacement : string
    nom : string
    extension : string

    constructor(emplacement:string, nom:string, extension:string) {
        if (Validation.validerEmplacement(emplacement)) {
            this.emplacement = emplacement;
        } else {
            throw new Error('Emplacement invalide');
        }

        if (Validation.validerIdentifiant(nom)) {
            this.nom = nom;
        } else {
            throw new Error('Format du nom invalide');
        }

        if (Validation.validerExtension(extension)) {
            this.extension = extension;
        } else {
            throw new Error('Extension invalide');
        }
    }

    getCheminComplet(){
        return `${this.emplacement}/${this.nom}.${this.extension}`; 
    }
}