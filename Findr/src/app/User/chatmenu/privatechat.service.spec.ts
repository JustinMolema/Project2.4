import { TestBed } from '@angular/core/testing';

import { PrivatechatService } from './privatechat.service';

describe('PrivatechatService', () => {
  let service: PrivatechatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivatechatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
