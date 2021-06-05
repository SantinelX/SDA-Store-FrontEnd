import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ProductsComponent} from './products/products.component';
import {RouteGuardService} from './route-guard.service';
import {CreateCategoryComponent} from './create-category/create-category.component';
import {CategoriesTreeViewComponent} from './categories-tree-view/categories-tree-view.component';
import {CreateProductComponent} from './create-product/create-product.component';
import {ProductTableViewComponent} from './product-table-view/product-table-view.component';
import {ProductCardViewComponent} from './product-card-view/product-card-view.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {OrderPageComponent} from './order-page/order-page.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductsComponent, canActivate: [RouteGuardService]},
  {path: 'categories', component: CreateCategoryComponent},
  {path: 'categories-tree-view', component: CategoriesTreeViewComponent},
  {path: 'create-product', component: CreateProductComponent},
  {path: 'product-table-view', component: ProductTableViewComponent},
  {path: 'create-category', component: CreateCategoryComponent},
  {path: 'product-card-view', component: ProductCardViewComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'my-orders', component: OrderPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
