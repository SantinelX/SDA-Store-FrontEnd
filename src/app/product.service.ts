import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  PaginatedProductResponse,
  ProductFilters,
  ProductRequestDto,
  ProductResponseDto
} from './model/product-model';
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

  getProductById(productId: number): Observable<ProductResponseDto>{
    return this.httpClient.get<ProductResponseDto>(this.PRODUCT_API + '/' + productId);
  }

  getProduct(page: number, pageSize: number, productFilter: ProductFilters): Observable<PaginatedProductResponse> {
    let PRODUCT_API_WITH_PAGE = this.PRODUCT_API + '?page=' + page + '&pageSize=' + pageSize;

    if (productFilter.name){
      PRODUCT_API_WITH_PAGE = PRODUCT_API_WITH_PAGE + '&name=' + productFilter.name;
    }
    if (productFilter.lowPrice === undefined) {
      productFilter.lowPrice = 0;
    }
    if (productFilter.lowPrice !== undefined) {
      PRODUCT_API_WITH_PAGE = PRODUCT_API_WITH_PAGE = PRODUCT_API_WITH_PAGE + '&price=lowPrice:' + productFilter.lowPrice + ',';
    }
    if (productFilter.highPrice) {
      PRODUCT_API_WITH_PAGE = PRODUCT_API_WITH_PAGE = PRODUCT_API_WITH_PAGE + 'highPrice:' + productFilter.highPrice;
    }
    if (productFilter.categoryId){
      PRODUCT_API_WITH_PAGE = PRODUCT_API_WITH_PAGE + '&categoryId=' + productFilter.categoryId;
    }
    if (productFilter.productType){
      PRODUCT_API_WITH_PAGE = PRODUCT_API_WITH_PAGE + '&productType=' + productFilter.productType;
    }

    return this.httpClient.get<PaginatedProductResponse>(PRODUCT_API_WITH_PAGE);
  }

  getProductTypes(): Observable<string[]>{
    return this.httpClient.get<string[]>(AppConfig.API_PATH + '/product-types');
  }
}
