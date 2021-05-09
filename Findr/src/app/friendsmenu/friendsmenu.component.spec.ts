import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsmenuComponent } from './friendsmenu.component';

describe('FriendsmenuComponent', () => {
  let component: FriendsmenuComponent;
  let fixture: ComponentFixture<FriendsmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
