import { TestBed, inject } from '@angular/core/testing';

import { WowService } from './wow.service';

describe('WowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WowService]
    });
  });

  it('should be created', inject([WowService], (service: WowService) => {
    expect(service).toBeTruthy();
  }));
});
