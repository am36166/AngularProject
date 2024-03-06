import { Document } from "./Document";
export class dossier {
  id!: string;
  idprop!: string;
  nom!: string;
  documents!: Document[];  // Assurez-vous que cela correspond à votre modèle Document
}

