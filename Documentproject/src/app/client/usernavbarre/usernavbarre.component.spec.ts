import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernavbarreComponent } from './usernavbarre.component';

describe('UsernavbarreComponent', () => {
  let component: UsernavbarreComponent;
  let fixture: ComponentFixture<UsernavbarreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsernavbarreComponent]
    });
    fixture = TestBed.createComponent(UsernavbarreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
