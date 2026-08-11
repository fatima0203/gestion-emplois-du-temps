import { TestBed } from '@angular/core/testing';

import { Semaines } from './semaines.service';

describe('Semaines', () => {
  let service: Semaines;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Semaines);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
