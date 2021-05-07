import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamemenuComponent } from './gamemenu.component';

describe('GamemenuComponent', () => {
  let component: GamemenuComponent;
  let fixture: ComponentFixture<GamemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamemenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
