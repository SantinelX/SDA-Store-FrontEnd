import {Component, Inject, OnInit} from '@angular/core';
import {CategoryService} from '../category.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {CategoryResponseDto} from '../model/category-model';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-categories-tree-view',
  templateUrl: './categories-tree-view.component.html',
  styleUrls: ['./categories-tree-view.component.css']
})
export class CategoriesTreeViewComponent implements OnInit {

  treeControl = new NestedTreeControl<CategoryResponseDto>(category => category.subCategory);
  dataSource = new  MatTreeNestedDataSource<CategoryResponseDto>();


  constructor(private categoryService: CategoryService,
              private toastr: ToastrService,
              public deleteDialog: MatDialog,
              public updateDialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllRootCategories();
  }

  getAllRootCategories(): void {
    this.categoryService.findAllRootCategories().subscribe(response => {
      this.dataSource.data = response;
    }, error => {
      console.log(error);
    });
  }

  hasSubcategories = (index: number, node: CategoryResponseDto) =>
    node.subCategory !== undefined
    && node.subCategory !== null
    && node.subCategory.length > 0

  // delete(id: number): void {
  //   this.categoryService.delete(id).subscribe((data): any => {
  //    this.toastr.success('The category has been deleted.');
  //    this.ngOnInit();
  //   }, error => {
  //     this.toastr.error('The categori has not been deleted. Error: ' + error);
  //   });
  // }

  showCategoryDeleteDialog(id: number): void {
      const deleteDialogReference = this.deleteDialog.open(CategoryDeleteDialogComponent, {data: {categoryId: id}});
      deleteDialogReference.afterClosed().subscribe(data => {
        this.getAllRootCategories();
      });
  }

  showCategoryUpdateDialog(id: number): void {
    const updateDialogReference = this.updateDialog.open(CategoryUpdateDialogComponent, {data: {categoryId: id}});
    updateDialogReference.afterClosed().subscribe(data => {
      this.getAllRootCategories();
    });
  }
}

@Component({
  selector: 'app-category-delete-dialog',
  templateUrl: 'category-delete-dialog.html'
})

export class CategoryDeleteDialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public deleteDialog: MatDialogRef<CategoriesTreeViewComponent>,
              private categoryService: CategoryService, private toastr: ToastrService) {
  }

  ngOnInit(): void {

  }

  handleDelete(): void {
    this.categoryService.delete(this.data.categoryId).subscribe((data) => {
      this.toastr.success('The category has been deleted.');
      this.deleteDialog.close();
    }, error => {
      this.toastr.error('Something went wrong !!!!' + error);
    });
  }

  handleClose(): void {
    this.deleteDialog.close();
    console.log(' "NO" button was presed');
  }
}

@Component({
  selector: 'app-category-update-dialog',
  templateUrl: 'category-update-dialog.html'
})

export class CategoryUpdateDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public updateDialog: MatDialogRef<CategoriesTreeViewComponent>,
              private categoryService: CategoryService, private toastr: ToastrService) {
  }

  ngOnInit(): void {

  }

  handleUpdate(): void {
    this.categoryService.update(this.data.categoryId, this.data.name).subscribe((data) => {
      this.toastr.success('The category has been updated.');
      this.updateDialog.close();
    });
  }

  handleClose(): void {
    this.updateDialog.close();
    console.log(' "NO" button was presed');
  }
}
