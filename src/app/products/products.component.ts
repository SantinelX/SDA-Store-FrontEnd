import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {ProductFilters, ProductResponseDto} from '../model/product-model';
import {PageEvent} from '@angular/material/paginator';
import {ShoppingCartService} from '../shopping-cart.service';
import {ShoppingCartResponseDto} from '../model/shopping-cart-model';
import {Toast, ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: ProductResponseDto[] = [];
  productTypes: string[] = [];
  totalNumberOfElements = 0;
  totalNumberOfElementsInCart = 0;
  productFilters: ProductFilters = {
    name: '',
    lowPrice: 0,
    productType: ''
  };

  constructor(private productService: ProductService,
              private shoppingCartService: ShoppingCartService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProducts(0, 10, {});
    this.productService.getProductTypes().subscribe((data: string[]) => {
      this.productTypes = data;
    });
  }

  changePage(event: PageEvent): void{
    this.getProducts(event.pageIndex, event.pageSize, {});
  }

  getProducts(page: number, pageSize: number, filters: ProductFilters): void{
    this.productService.getProduct(page, pageSize, filters).subscribe(
      (data) => {
        this.products = data.content;
        this.totalNumberOfElements = data.totalElements;
      });
  }

  addProductToCart(productId: number): void{
    this.shoppingCartService.addProductToCart(productId).subscribe((data: ShoppingCartResponseDto) => {
      this.totalNumberOfElementsInCart = data.productsInCart.length;
    }, error => {
      this.toastr.warning('Producrt already in cart.');
    });
  }

  filterProducts(event: any): void {
    this.productFilters.name = event;
    this.getProducts(0, 10, this.productFilters);
  }

  changeLowPrice(event: any): void {
    if (event.target.value === ''){
      this.productFilters.lowPrice = 0;
    } else {
      this.productFilters.lowPrice = event.target.value;
    }
    this.getProducts(0, 5, this.productFilters);
  }

  changeHighPrice(event: any): void {
    if (event.target.value === ''){
      this.productFilters.highPrice = undefined;
    } else {
      this.productFilters.highPrice = event.target.value;
    }
    this.getProducts(0, 10, this.productFilters);
  }

  changeProductType(event: any): void {
    this.productFilters.productType = event.value;
    this.getProducts(0, 10, this.productFilters);
  }

  filterProductsByCategory(event: any): void {
    this.productFilters.categoryId = event;
    this.getProducts(0, 10, this.productFilters);
  }

}
