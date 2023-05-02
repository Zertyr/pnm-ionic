import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ListQrcodePage } from './list-qrcode.page';
import { BoxService } from 'src/app/services/box.service';
import { of } from 'rxjs';

describe('ListQrcodePage', () => {
  let component: ListQrcodePage;
  let fixture: ComponentFixture<ListQrcodePage>;
  let mockBoxService: jasmine.SpyObj<BoxService>;
  const boxList = [{
    id: 1,
    name: 'NewBox'
  },
  {
    id: 2,
    name: 'NewBox2'
  },
  {
    id: 3,
    name: 'NewBox3'
  },
  {
    id: 4,
    name: 'NewBox4'
  }
]
  ;
  beforeEach(waitForAsync(() => {
    mockBoxService = jasmine.createSpyObj('BoxService', ['getAllBox']);
    TestBed.configureTestingModule({
      declarations: [ ListQrcodePage ],
      imports: [IonicModule.forRoot(),RouterTestingModule,HttpClientTestingModule],
      providers: [{ provide: BoxService, useValue: mockBoxService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListQrcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    //mockBoxService.getAllBox.and.returnValue(of(boxList));
    expect(component).toBeTruthy();
  });
});
