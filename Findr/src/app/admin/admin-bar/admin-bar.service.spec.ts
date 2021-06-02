import { TestBed } from '@angular/core/testing';

import { AdminBarService } from './admin-bar.service';

describe('AdminBarService', () => {
  let service: AdminBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
