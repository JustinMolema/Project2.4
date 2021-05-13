import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameslistComponent } from './gameslist.component';

describe('GameslistComponent', () => {
  let component: GameslistComponent;
  let fixture: ComponentFixture<GameslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
