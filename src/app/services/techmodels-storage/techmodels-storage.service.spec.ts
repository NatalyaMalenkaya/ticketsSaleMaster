import { TestBed } from '@angular/core/testing';

import { TechmodelsStorageService } from './tiсkets-storage.service';

describe('TechmodelsStorageService', () => {
  let service: TechmodelsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechmodelsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
