import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ProductFilters, ProductResponseDto} from '../model/product-model';
import {ProductService} from '../product.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-product-table-view',
  templateUrl: './product-table-view.component.html',
  styleUrls: ['./product-table-view.component.css']
})
export class ProductTableViewComponent implements OnInit {

  columns = ['productId', 'productName', 'productPrice', 'productCategory', 'productActions' ];
  dataSource = new MatTableDataSource<ProductResponseDto>();
  totalNumberOfElements = 0;
  productFilters: ProductFilters = {};

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts(0, 5, this.productFilters);
  }

  getProducts(page: number, pageSize: number, productFiter: ProductFilters): void{
    this.productService.getProduct(page, pageSize, productFiter).subscribe(data => {
      this.dataSource.data = data.content;
      this.totalNumberOfElements = data.totalElements;
      console.log(data.content);
    }, error => {
      console.log(error);
    });
  }

  changePage(event: PageEvent): void {
    this.productService.getProduct(event.pageIndex, event.pageSize, this.productFilters);
    console.log('Page has changed!!!');
  }

  delete(productId: number): void {
    console.log('Deleting !!!', productId);
  }

  filter(event: KeyboardEvent): void{
    this.productFilters.name = this.productFilters.name + event.key;
    console.log(event.key);
  }

  filterTable(): void {
    this.getProducts(0, 5, this.productFilters);
  }

  getCategoryId(event: any): void {
    this.productFilters.categoryId = event;
    this.getProducts(0, 5, this.productFilters);
    console.log(event);
  }

}
