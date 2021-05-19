import { TestBed } from '@angular/core/testing';

import { AdmindataService } from './admindata.service';

describe('AdmindataService', () => {
  let service: AdmindataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmindataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
