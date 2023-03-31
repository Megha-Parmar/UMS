import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const mockList ={
    "status_code": 200,
    "success": true,
    "body": [
      {
        "firstName": "megha",
        "lastName": "Parmar",
        "userName": "megha.parmar",
        "email": "1997meghal@gmail.com",
        "phoneNumber": "4546576",
        "role": {
          "id": 2,
          "name": "ADMIN",
          "value": "Admin"
        },
        "status": "ACTIVE",
        "uniqueId": "U_5wyd4i",
        "dob": "1997-03-21T18:30:00.000Z",
        "password": "aIkFQvGaLZ1hbnAA/FBS6A==",
        "createdAt": 1648412948738,
        "id": 12
      }
    ],
    "totalData": 7
  }

  
  beforeEach(() => {
    TestBed.configureTestingModule({   imports: [HttpClientTestingModule], });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
