import {Component, Inject, OnInit} from '@angular/core';
import {ShoppingCartService} from '../shopping-cart.service';
import {ProductShoppingCartResponseDto, ShoppingCartResponseDto} from '../model/shopping-cart-model';
import {ProductService} from '../product.service';
import {ProductOrderLine, ProductResponseDto} from '../model/product-model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  products: ProductResponseDto[] = [];
  productOrderLine: ProductOrderLine[] = [];

  constructor(private shoppingCartService: ShoppingCartService,
              private productService: ProductService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.shoppingCartService.getProductsFromcart().subscribe((data: ShoppingCartResponseDto) => {
      const productsInCart: ProductShoppingCartResponseDto[] = data.productsInCart;
      productsInCart.forEach(product => {
        this.productService.getProductById(product.id).subscribe(productData => {
          this.products.push(productData);
          this.productOrderLine.push({productId: productData.id, quantity: 1});
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

  removeProductFromShoppingCart(id: number): void{
    this.shoppingCartService.removeProductFromCart(id).subscribe((data) => {
      this.toastr.success('Product has been removed from shopping cart.');
      window.location.reload();
    }, error => {
      this.toastr.error('Something went wrong !!!!' + error);
    });
  }

}
