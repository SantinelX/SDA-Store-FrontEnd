import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfig} from './config/app-config';
import {CategoryRequestDto, CategoryResponseDto} from './model/category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  CATEGORIES_API = AppConfig.API_PATH + '/categories';

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Array<CategoryResponseDto>>{
    return this.httpClient.get<Array<CategoryResponseDto>>(this.CATEGORIES_API + '/all');
  }

  findAllRootCategories(): Observable<any> {
    return this.httpClient.get(this.CATEGORIES_API);
  }

  create(categoryRequestDto: CategoryRequestDto): Observable<CategoryResponseDto> {
    return this.httpClient.post<CategoryResponseDto>(this.CATEGORIES_API, categoryRequestDto);
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.CATEGORIES_API + '/delete/' + id);
  }

  update(id: number, updatedName: CategoryRequestDto): Observable<CategoryResponseDto> {
    return this.httpClient.put<CategoryResponseDto>(this.CATEGORIES_API + '/' + id, {name: updatedName});
  }

}
