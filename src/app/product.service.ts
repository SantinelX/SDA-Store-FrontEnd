import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductRequestDto, ProductResponseDto, ProductTyp} from './model/product-model';
import {Observable} from 'rxjs';
import {AppConfig} from './config/app-config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  PRODUCT_API = AppConfig.API_PATH + '/products';

  constructor(private httpClient: HttpClient) { }

  createProduct(productRequestDto: ProductRequestDto): Observable<ProductResponseDto> {
    return this.httpClient.post<ProductResponseDto>(this.PRODUCT_API, productRequestDto);
  }
}
