import { Component } from '@angular/core';
import { DocumentService } from 'src/app/service/document.service';
import { Document } from 'src/app/model/Document';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent {
  documents$!: Observable<Document[]>;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents$ = this.documentService.getAllDocuments();
  }

  addDocument(document: Document): void {
    this.documentService.addDocument(document);
  }

  updateDocument(updatedDocument: Document): void {
    this.documentService.updateDocument(updatedDocument);
  }

  deleteDocument(document: Document): void {
    this.documentService.deleteDocument(document);
  }

 
}
