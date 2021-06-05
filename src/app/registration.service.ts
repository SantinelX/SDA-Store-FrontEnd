import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserDto} from './model/user-models';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  API_PATH = 'http://localhost:8080/register';

  constructor(private httpClient: HttpClient) { }

  create(requestUserDto: UserDto): Observable<any> {
    return this.httpClient.post<UserDto>(this.API_PATH, requestUserDto);
  }
}
