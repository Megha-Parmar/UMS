import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserListResolver } from './user-list.resolver';

describe('UserListResolver', () => {
  let resolver: UserListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    resolver = TestBed.inject(UserListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
