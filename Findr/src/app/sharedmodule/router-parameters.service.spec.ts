import { TestBed } from '@angular/core/testing';

import { RouterParametersService } from './router-parameters.service';

describe('RouterParametersService', () => {
  let service: RouterParametersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterParametersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
