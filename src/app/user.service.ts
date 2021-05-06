import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Role, UserDto} from './model/user-models';
import {AppConfig} from './config/app-config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  getRoles(): Observable<Array<Role>> {
    return this.httpClient.get<Array<Role>>(AppConfig.API_PATH + '/users/roles');
  }
  register(userDto: UserDto): Observable<UserDto>{
    return this.httpClient.post<UserDto>(AppConfig.API_PATH + '/register', userDto);
  }
}
