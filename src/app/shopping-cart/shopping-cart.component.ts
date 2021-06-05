import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {ProductShoppingCartResponseDto, ShoppingCartResponseDto} from '../model/shopping-cart-model';
import {ProductService} from '../product.service';
import {ProductResponseDto} from '../model/product-model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products: ProductResponseDto[] = [];

  constructor(private shoppingCartService: ShoppingCartService, private productService: ProductService) { }

  ngOnInit(): void {
    this.shoppingCartService.getProductsFromcart().subscribe((data: ShoppingCartResponseDto) => {
      const productsInCart: ProductShoppingCartResponseDto[] = data.productsInCart;
      productsInCart.forEach(product => {
        this.productService.getProductById(product.id).subscribe(productData => {
          this.products.push(productData);
        });
      });
    });
  }

  makeOrder(): void{

  }

  changeQuantity(event: any, productId: number): void {
    console.log('Event is ' + event);
    console.log('Product Id is' + productId);
  }

}
