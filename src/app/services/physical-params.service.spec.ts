import { TestBed } from '@angular/core/testing';

import { PhysicalParamsService } from './physical-params.service';

describe('PhysicalParamsService', () => {
  let service: PhysicalParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhysicalParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
