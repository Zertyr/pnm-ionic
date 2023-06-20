import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { User, UserClass } from '../user';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPage],
      imports: [FormsModule, HttpClientTestingModule, IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('User class tests', () => {
    let user: User = null

    beforeEach(() => {
      user = new UserClass();
    });

    it('should have a valid constructor', () => {
      expect(user).not.toBeNull();
    });

    it('should set name correctly through constructor', () => {
      user = new UserClass('Damien');
      expect(user.name).toEqual('Damien');
    });

    it('should not set name correctly through constructor', () => {
      user = new UserClass('Colin');
      expect(user.name).toEqual('Damien');
    });

    afterEach(() => {
      user = null;
    });
  });
});
