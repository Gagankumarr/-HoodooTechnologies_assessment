import { TestBed } from '@angular/core/testing';

import { GetCooksService } from './get-cooks.service';

describe('GetCooksService', () => {
  let service: GetCooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
