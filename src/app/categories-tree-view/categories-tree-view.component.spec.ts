import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesTreeViewComponent } from './categories-tree-view.component';

describe('CategoriesTreeViewComponent', () => {
  let component: CategoriesTreeViewComponent;
  let fixture: ComponentFixture<CategoriesTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesTreeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
