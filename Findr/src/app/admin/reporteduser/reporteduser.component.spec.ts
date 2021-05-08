import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteduserComponent } from './reporteduser.component';

describe('ReporteduserComponent', () => {
  let component: ReporteduserComponent;
  let fixture: ComponentFixture<ReporteduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteduserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
