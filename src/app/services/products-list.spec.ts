import { TestBed } from '@angular/core/testing';

import { ProductsList } from './products-list';

describe('ProductsList', () => {
  let service: ProductsList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
