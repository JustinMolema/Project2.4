import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatmenuComponent } from './chatmenu.component';

describe('ChatmenuComponent', () => {
  let component: ChatmenuComponent;
  let fixture: ComponentFixture<ChatmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatmenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
