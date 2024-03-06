import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDossierComponent } from './list-dossier.component';

describe('ListDossierComponent', () => {
  let component: ListDossierComponent;
  let fixture: ComponentFixture<ListDossierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDossierComponent]
    });
    fixture = TestBed.createComponent(ListDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
