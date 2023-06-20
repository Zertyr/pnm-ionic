import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { VehiclesService } from './vehicles.service';
import { IonicModule } from '@ionic/angular';

describe('VehiclesService', () => {
  let service: VehiclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ IonicModule.forRoot(),RouterTestingModule, HttpClientTestingModule],
    });
    service = TestBed.inject(VehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
