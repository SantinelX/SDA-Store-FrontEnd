import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {CategoryService} from '../category.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {CategoryRequestDto, CategoryResponseDto} from '../model/category-model';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categories-tree-view',
  templateUrl: './categories-tree-view.component.html',
  styleUrls: ['./categories-tree-view.component.css']
})
export class CategoriesTreeViewComponent implements OnInit {

  @Output() categoryChangeEvent: EventEmitter<any> = new EventEmitter<any>();

  treeControl = new NestedTreeControl<CategoryResponseDto>(category => category.subCategory);
  dataSource = new  MatTreeNestedDataSource<CategoryResponseDto>();
  role = localStorage.getItem('ROLE');


  constructor(private categoryService: CategoryService,
              private router: Router,
              private toastr: ToastrService,
              public addDialog: MatDialog,
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

  checkNodeId(node: any): void{
    this.categoryChangeEvent.emit(node.id);
    console.log(node);
  }

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

  showAddCategoryDialog(): void {
   this.addDialog.open(CategoryAddDialogComponent);
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
    }, error => {
      this.toastr.error('Category exists in datatbase !!!');
    });
  }

  handleClose(): void {
    this.updateDialog.close();
    console.log(' "NO" button was presed');
  }
}

@Component({
  selector: 'app-category-add-dialog',
  templateUrl: 'category-add-dialog.html'
})

export class CategoryAddDialogComponent implements OnInit {

  categoryResponseDto: CategoryResponseDto[] = [];
  categoryRequestDto: CategoryRequestDto = {
    name: '',
    parentId: null
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public addDialog: MatDialogRef<CategoriesTreeViewComponent>,
              private categoryService: CategoryService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe((categoryArray) => {
      this.categoryResponseDto = categoryArray;
    }, errorMsg => {
      console.log(errorMsg);
    });
  }

  handleAddCategory(): void {
    this.categoryService.create(this.categoryRequestDto).subscribe( (response) => {
      this.toastr.success('The new category was added succesfuly.');
      this.ngOnInit();
      this.addDialog.close();
    }, errorMsg => {
      this.toastr.error('Category not saved !!! Error: ' + errorMsg);
      console.error(errorMsg);
    });
  }

  handleClose(): void {
    this.addDialog.close();
    console.log(' "NO" button was presed');
  }
}
