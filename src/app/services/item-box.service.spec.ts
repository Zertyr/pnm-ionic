import { TestBed } from '@angular/core/testing';

import { ItemBoxService } from './item-box.service';

describe('ItemBoxService', () => {
  let service: ItemBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
