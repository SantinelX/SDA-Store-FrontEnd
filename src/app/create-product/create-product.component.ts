import { Component, OnInit } from '@angular/core';
import {ProductRequestDto, ProductType} from '../model/product-model';
import {ProductService} from '../product.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  // productRequestDto: ProductRequestDto ={
  //
  // }


  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  // saveProduct(): void {
  //   this.productService.createProduct(this.productRequestDto).subscribe((response) => {
  //     this.toastr.success('Item saved succesfuly.');
  //   }, errorMsg => {
  //     this.toastr.error('Something went Wrong. Product not saved !!! [' + errorMsg + ']');
  //   });
  // }

}
