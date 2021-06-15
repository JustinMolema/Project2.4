import { TestBed } from '@angular/core/testing';

import { FriendactionsService } from './friendactions.service';

describe('FriendactionsService', () => {
  let service: FriendactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
