import { TestBed } from '@angular/core/testing';

import { FitDietService } from './fit-diet.service';

describe('FitDietService', () => {
  let service: FitDietService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitDietService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
