import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportticketComponent } from './supportticket.component';

describe('SupportticketComponent', () => {
  let component: SupportticketComponent;
  let fixture: ComponentFixture<SupportticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportticketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
