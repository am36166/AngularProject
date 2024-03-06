import { Validation } from "./Validation";
import { Chemin } from "./Chemin";

export class Document {
    id! : string 
    isEdit! : boolean
    _chemin! : Chemin
    _taille! : number
    _extension! : string
    _Idproprietaire! : string
    _type! : string
     editMode: any;

    constructor(id:string, emplacement:string, identificateur:string, extension:string, taille:number, Idproprietaire:string, type:string) {
        this.id = id;
        this._chemin = new Chemin(emplacement, identificateur , extension);
        this.isEdit = false

        try {
            this._taille = taille;

            if (Validation.validerIdentifiant(Idproprietaire)) {
                this._Idproprietaire = Idproprietaire;
            } else {
                throw new Error('Identifiant propriétaire invalide');
            }

            switch (extension) {
                case Validation.TYPE_DOC.text:
                    this._type = type;
                    break;
                case Validation.TYPE_DOC.ppt:
                    this._type = type;
                    break;
                case Validation.TYPE_DOC.sound:
                    this._type = type;
                    break;
                case Validation.TYPE_DOC.video:
                    this._type = type;
                    break;
            }
        } catch (error) {
            console.error("une erreur est survenu");
        }
    }

    get chemin() {
        return this._chemin;
    }

    set chemin(newChemin) {
        this._chemin = newChemin;
    }

    get taille() {
        return this._taille;
    }

    set taille(newTaille) {
        this._taille = newTaille;
    }

    get Idproprietaire() {
        return this._Idproprietaire;
    }

    set Idproprietaire(newIdproprietaire) {
        if (Validation.validerIdentifiant(newIdproprietaire)) {
            this._Idproprietaire = newIdproprietaire;
        } else {
            throw new Error('Identifiant propriétaire invalide');
        }
    }

    get type() {
        return this._type;
    }

    set type(newType) {
        this._type = newType;
    }

    getListeDossierEmplacement(): string[] {
        if (this._chemin && this._chemin.emplacement) {
            const emplacement = this._chemin.emplacement;
            const regex = /[^\/]+/g;
            const listeDossiers = emplacement.match(regex);
            return listeDossiers ? Array.from(listeDossiers) : [];
        } else {
            return [];
        }
    }
    

    static getInstanceFromTexte(texteJSON: string): Document | null {
        try {
          const donnees = JSON.parse(texteJSON);
          return new Document(
            donnees.id,
            donnees.emplacement,
            donnees.nom,
            donnees.extension, 
            donnees.taille,
            donnees.Idproprietaire,
            donnees.type
          );

        } catch (error) {
          console.error('Erreur lors de la création de l\'instance de Document à partir du texte JSON:', error);
          return null;
        }
      }
}
/*
  Representation json 
const doc1 = {
    emplacement: "Dossier1/documents",
    identificateur: "MonDocumentTexte",
    extension: "txt",
    type: "text", 
    taille: 23600,
    proprietaire: "A1B2C3D4E5F6G"
};
// Affichage de l'objet JSON
console.log(JSON.stringify(doc1, null, 2));

Instance de l'objet 
const doc2 = new Document(
    "Dossier1/documents",
    "MonDocumentTexte",
    "txt",
    Validation.TYPE_DOC.text, // Assurez-vous d'importer correctement votre classe Validation
    23600,
    "A1B2C3D4E5F6G"
);
*/