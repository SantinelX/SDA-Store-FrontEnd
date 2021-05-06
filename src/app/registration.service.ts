import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestUserDto} from './register/register.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  API_PATH = 'http://localhost:8080/register';

  constructor(private httpClient: HttpClient) { }

  create(requestUserDto: RequestUserDto): Observable<any> {
    return this.httpClient.post<RequestUserDto>(this.API_PATH, requestUserDto);
  }
}
