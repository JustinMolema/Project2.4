import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintopbarComponent } from './admintopbar.component';

describe('AdmintopbarComponent', () => {
  let component: AdmintopbarComponent;
  let fixture: ComponentFixture<AdmintopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmintopbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
