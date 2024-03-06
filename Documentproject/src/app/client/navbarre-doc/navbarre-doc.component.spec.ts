import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarreDocComponent } from './navbarre-doc.component';

describe('NavbarreDocComponent', () => {
  let component: NavbarreDocComponent;
  let fixture: ComponentFixture<NavbarreDocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarreDocComponent]
    });
    fixture = TestBed.createComponent(NavbarreDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
