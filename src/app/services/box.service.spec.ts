import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BoxService } from './box.service';
import { IonicModule } from '@ionic/angular';

describe('BoxService', () => {
  let service: BoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [IonicModule.forRoot(),RouterTestingModule, HttpClientTestingModule]
    });
    service = TestBed.inject(BoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
