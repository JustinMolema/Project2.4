import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordforgottenComponent } from './passwordforgotten.component';

describe('PasswordforgottenComponent', () => {
  let component: PasswordforgottenComponent;
  let fixture: ComponentFixture<PasswordforgottenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordforgottenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordforgottenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
