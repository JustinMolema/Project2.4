import { TestBed } from '@angular/core/testing';

import { NavitemService } from './nav-item.service';

describe('NavItemService', () => {
  let service: NavitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
