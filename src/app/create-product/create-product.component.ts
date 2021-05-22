import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service';
import {ToastrService} from 'ngx-toastr';
import {Category, CategoryRequestDto, CategoryResponseDto} from '../model/category-model';
import {ProductRequestDto, ProductResponseDto} from '../model/product-model';
import {CategoryService} from '../category.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  categorys: CategoryResponseDto[] = [];
  productType: string[] = ['IT' , 'APPLIANCES'];
  product: ProductRequestDto = { } as ProductRequestDto;



  constructor(private productService: ProductService, private categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe((data: CategoryResponseDto[]) => {
      this.categorys = data;
    }, error => {
      console.log(error);
    });
  }

  saveProduct(): void {
    this.productService.createProduct(this.product).subscribe((response: ProductResponseDto) => {
      this.toastr.success('Product created succesfuly.');
    }, errorMsg => {
      this.toastr.error('Something went Wrong. Product not saved !!! [' + errorMsg + ']');
    });
  }

}
