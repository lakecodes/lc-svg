import { TestBed, inject } from '@angular/core/testing';

import { LcSvgService } from './lc-svg.service';

describe('LcSvgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LcSvgService]
    });
  });

  it('should be created', inject([LcSvgService], (service: LcSvgService) => {
    expect(service).toBeTruthy();
  }));
});
