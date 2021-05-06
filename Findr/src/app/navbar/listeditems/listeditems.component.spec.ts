import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeditemsComponent } from './listeditems.component';

describe('ListeditemsComponent', () => {
  let component: ListeditemsComponent;
  let fixture: ComponentFixture<ListeditemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeditemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeditemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
