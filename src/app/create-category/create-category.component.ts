import { Component, OnInit } from '@angular/core';
import {CategoryRequestDto, CategoryResponseDto} from '../model/category-model';
import {CategoryService} from '../category.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  categoryResponsDto: CategoryResponseDto[] = [];
  categoryRequestDto: CategoryRequestDto = {
    name: '',
    parentId: null
  };

  constructor(private categoryService: CategoryService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe((categoryArray) => {
      this.categoryResponsDto = categoryArray;
    }, errorMsg => {
      console.log(errorMsg);
    });
  }

  save(): void {
    this.categoryService.create(this.categoryRequestDto).subscribe( (response) => {
      this.toastr.success('The new category was added succesfuly.');
      this.ngOnInit();
    }, errorMsg => {
      this.toastr.error('Category not saved !!! Error: ' + errorMsg);
      console.error(errorMsg);
    });
  }

}
