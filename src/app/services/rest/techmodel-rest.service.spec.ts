import { TestBed } from '@angular/core/testing';

import { TicketRestService } from './techmodel-rest.service';

describe('TicketRestService', () => {
  let service: TicketRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
