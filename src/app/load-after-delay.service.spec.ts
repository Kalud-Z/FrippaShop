import { TestBed } from '@angular/core/testing';

import { LoadAfterDelayService } from './load-after-delay.service';

describe('LoadAfterDelayService', () => {
  let service: LoadAfterDelayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadAfterDelayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
