import { Routes } from '@angular/router';
import {Product} from './pages/product/product';
import {AddProduct} from './pages/add-product/add-product';
import {UpdateProduct} from './pages/update-product/update-product';
import {SearchByCategory} from './pages/search-by-category/search-by-category';
import {SearchByName} from './pages/search-by-name/search-by-name';
import {Category} from './pages/category/category';
import {Login} from './pages/login/login';
import {NotFound} from './pages/not-found/not-found';
import {productGuard} from './guards/product-guard';
import {Register} from './pages/register/register';

export const routes: Routes = [
  {path: 'products', component: Product},
  {path: 'add-product', component: AddProduct, canActivate:[productGuard] },
  {path: 'update-product/:id', component: UpdateProduct, canActivate:[productGuard] },
  {path: 'search-by-cat', component: SearchByCategory},
  {path: 'search-by-name', component: SearchByName},
  {path: 'list-cat', component: Category, canActivate:[productGuard]},
  {path: 'login', component: Login},
  {path: 'register', component: Register},
  {path: 'not-found', component: NotFound},
  {path: '',redirectTo:"products",pathMatch:"full", },
];
