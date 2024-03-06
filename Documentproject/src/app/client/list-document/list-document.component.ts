import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/service/document.service';
import { Document } from 'src/app/model/Document';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.css']
})
export class ListDocumentComponent implements OnInit {
  documents$!: Observable<Document[]>;
  Updated: boolean = false;
   SuccesMessage: string = "les modifications ont ete bien apportes";
  constructor(private documentService: DocumentService ) {}

  ngOnInit(): void {
    this.documents$ = this.documentService.getAllDocuments();

  }

  deleteDocument(document: Document): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur?')) {
    this.documentService.deleteDocument(document);
  }
}

onEdit(document: Document): void {
  document.isEdit = !document.isEdit;

  if (!document.isEdit) {
    this.documentService.updateDocument(document);
    this.Updated = true ;
    setTimeout(() => {
      this.Updated = !this.Updated ;

    }, 3000);
  }
}


}
