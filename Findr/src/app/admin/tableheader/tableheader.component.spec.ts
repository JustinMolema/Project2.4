import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableheaderComponent } from './tableheader.component';

describe('TableheaderComponent', () => {
  let component: TableheaderComponent;
  let fixture: ComponentFixture<TableheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
