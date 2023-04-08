import { TestBed } from '@angular/core/testing';

import { ItemService } from './item.service';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { IonicModule } from '@ionic/angular';

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [IonicModule.forRoot(),RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
