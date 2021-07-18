// @ts-ignore

import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ProductFilters, ProductResponseDto} from '../model/product-model';
import {ProductService} from '../product.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-product-table-view',
  templateUrl: './product-table-view.component.html',
  styleUrls: ['./product-table-view.component.css']
})
export class ProductTableViewComponent implements OnInit {

  columns = ['productId', 'productName', 'productThumbnail', 'productDescription', 'productCategory', 'productPrice',  'productActions' ];
  products: ProductResponseDto[] = [];
  dataSource = new MatTableDataSource<ProductResponseDto>();
  totalNumberOfElements = 0;
  productFilters: ProductFilters = {};

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService,
              private toastr: ToastrService,
              public deleteProductDialog: MatDialog,
              public editProductDialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts(0, 10, this.productFilters);
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

  filter(event: KeyboardEvent): void{
    this.productFilters.name = this.productFilters.name + event.key;
    console.log(event.key);
  }

  filterTable(): void {
    this.getProducts(0, 10, this.productFilters);
  }

  getCategoryId(event: any): void {
    this.productFilters.categoryId = event;
    this.getProducts(0, 10, this.productFilters);
    console.log(event);
  }

  showProductDeleteDialog(id: number): void {
    const deleteDialogReference = this.deleteProductDialog.open(ProductDeleteDialogComponent, {data: {productId: id}});
    deleteDialogReference.afterClosed().subscribe(data => {
      window.location.reload();
    });
  }
}

@Component({
  selector: 'app-product-delete-dialog',
  templateUrl: 'product-delete-dialog.html',
  // styleUrls: ['./product-delete-dialog.css']
})

export class ProductDeleteDialogComponent implements  OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public deleteProduct: MatDialogRef<ProductTableViewComponent>,
              private toastr: ToastrService,
              private productService: ProductService){
  }

  ngOnInit(): void {
  }

  handleDeleteProduct(): void{
    this.productService.deleteProduct(this.data.productId).subscribe((data) => {
      this.toastr.success('The product has been deleted');
      window.location.reload();
    },  error => {
      this.toastr.error('ERROR !!! The product has not been removed from database !!!');
    });
  }

  handleClose(): void {
    this.deleteProduct.close();
  }
}
