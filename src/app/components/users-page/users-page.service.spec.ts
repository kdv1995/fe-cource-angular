import { TestBed } from '@angular/core/testing';

import { UsersPageService } from './users-page.service';

describe('UsersPageService', () => {
  let service: UsersPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
