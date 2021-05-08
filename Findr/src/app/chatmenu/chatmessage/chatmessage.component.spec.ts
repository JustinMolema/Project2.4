import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatmessageComponent } from './chatmessage.component';

describe('ChatmessageComponent', () => {
  let component: ChatmessageComponent;
  let fixture: ComponentFixture<ChatmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatmessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
