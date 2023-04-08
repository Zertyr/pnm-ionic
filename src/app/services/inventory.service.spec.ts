import { TestBed } from '@angular/core/testing';

import { InventoryService } from './inventory.service';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InventoryServicesService', () => {
  let service: InventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [IonicModule.forRoot(),RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(InventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
