import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerDocumentComponent } from './creer-document.component';

describe('CreerDocumentComponent', () => {
  let component: CreerDocumentComponent;
  let fixture: ComponentFixture<CreerDocumentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreerDocumentComponent]
    });
    fixture = TestBed.createComponent(CreerDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
