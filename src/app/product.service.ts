import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaginatedProductResponse, ProductFilters, ProductRequestDto, ProductResponseDto, ProductTyp} from './model/product-model';
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

  getProduct(page: number, pageSize: number, productFilter: ProductFilters): Observable<PaginatedProductResponse> {
    let PRODUCT_API_WITH_PAGE = this.PRODUCT_API + '?page=' + page + '&pageSize=' + pageSize;

    if (productFilter.name){
      PRODUCT_API_WITH_PAGE = PRODUCT_API_WITH_PAGE + '&name=' + productFilter.name;
    }
    if (productFilter.lowPrice && !productFilter.highPrice){
      PRODUCT_API_WITH_PAGE = PRODUCT_API_WITH_PAGE + '&price=' + productFilter.lowPrice + ':';
    }
    if (productFilter.lowPrice && productFilter.highPrice ){
      PRODUCT_API_WITH_PAGE = PRODUCT_API_WITH_PAGE + '&price=' + productFilter.lowPrice + ':' + productFilter.highPrice;
    }
    if (productFilter.categoryId){
      PRODUCT_API_WITH_PAGE = PRODUCT_API_WITH_PAGE + '&categoryId=' + productFilter.categoryId;
    }
    if (productFilter.productType){
      PRODUCT_API_WITH_PAGE = PRODUCT_API_WITH_PAGE + '&categoryType=' + productFilter.productType;
    }

    return this.httpClient.get<PaginatedProductResponse>(PRODUCT_API_WITH_PAGE);
  }
}
