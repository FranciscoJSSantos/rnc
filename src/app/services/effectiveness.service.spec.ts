import { TestBed } from '@angular/core/testing';

import { EffectivenessService } from './effectiveness.service';

describe('EffectivenessService', () => {
  let service: EffectivenessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EffectivenessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
