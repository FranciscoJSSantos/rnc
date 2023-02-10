import { TestBed } from '@angular/core/testing';

import { NonConformitieService } from './non-conformitie.service';

describe('NonConformitieService', () => {
  let service: NonConformitieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonConformitieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
