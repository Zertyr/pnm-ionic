import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ItemBoxService } from './item-box.service';
import { IonicModule } from '@ionic/angular';

describe('ItemBoxService', () => {
  let service: ItemBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [IonicModule.forRoot(),RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(ItemBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
