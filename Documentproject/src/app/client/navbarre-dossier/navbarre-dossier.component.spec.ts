import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarreDossierComponent } from './navbarre-dossier.component';

describe('NavbarreDossierComponent', () => {
  let component: NavbarreDossierComponent;
  let fixture: ComponentFixture<NavbarreDossierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarreDossierComponent]
    });
    fixture = TestBed.createComponent(NavbarreDossierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
