export class Validation {
    static TYPE_DOC = {
      text: "txt",
      doc: "doc",
      ppt: "ppt",
      sound: "sound",
      video: "video",
      other: "other"
    };
  
    static validerType(texte: string) {
      return Object.values(this.TYPE_DOC).includes(texte);
    }
  
    static validerIdentifiant(texte: string | undefined | null) {
      return texte ? texte.match(new RegExp("[a-zA-Z0-9]+", "i")) !== null : false;
    }
  
    static validerIdentificateur(texte: string) {
      return texte.match(new RegExp("^[a-zA-Z_]([a-zA-Z0-9][_$-@])+", "i")) !== null;
    }
  
    static validerEmplacement(texte: string) {
      return texte.match(new RegExp("[a-zA-Z_]([a-zA-Z0-9][_$-@]\/)*", "i")) !== null;
    }
  
    static validerEmail(email: string) {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    }
  
    static validerExtension(texte: string) {
      return texte.match(new RegExp("[a-zA-Z0-9]{1,6}", "i")) !== null;
    }
  }
  