import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LostPasswordPage } from './lost-password.page';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('LostPasswordPage', () => {
  let component: LostPasswordPage;
  let fixture: ComponentFixture<LostPasswordPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LostPasswordPage ],
      imports: [FormsModule, HttpClientTestingModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LostPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
