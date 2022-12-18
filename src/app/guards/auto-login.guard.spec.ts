import { TestBed } from '@angular/core/testing';

import { AutoLoginGuard } from './auto-login.guard';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AutoLoginGuard', () => {
  let guard: AutoLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    guard = TestBed.inject(AutoLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
