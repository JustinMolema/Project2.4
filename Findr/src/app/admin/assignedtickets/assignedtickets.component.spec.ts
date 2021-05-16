import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedticketsComponent } from './assignedtickets.component';

describe('AssignedticketsComponent', () => {
  let component: AssignedticketsComponent;
  let fixture: ComponentFixture<AssignedticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedticketsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
