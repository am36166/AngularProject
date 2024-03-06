import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreeDossierComponent } from './cree-dossier.component';

describe('CreeDossierComponent', () => {
  let component: CreeDossierComponent;
  let fixture: ComponentFixture<CreeDossierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreeDossierComponent]
    });
    fixture = TestBed.createComponent(CreeDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
