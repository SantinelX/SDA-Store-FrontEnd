import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfig} from './config/app-config';

@Injectable({
  providedIn: 'root'
})
export class AutorisationService {

  constructor(private httpClient: HttpClient) { }

  doAut(email: string, pasword: string): Observable<any> {
    return this.httpClient.post<any>(AppConfig.API_PATH + '/users/login', {

    }, { headers: {
      Authorization: this.buildAuthorisationHeaders(email, pasword)
      }
    });
  }

  buildAuthorisationHeaders(email: string, password: string): string {
    const autHeader = 'Basic ' + btoa(email + ':' + password);
    localStorage.setItem(AppConfig.AUTHORISATION_HEADER, autHeader);
    return autHeader;
  }
}
