import { TestBed } from '@angular/core/testing';

import { TechnicService } from './tickets.service';

describe('TechnicService', () => {
  let service: TechnicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechnicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
