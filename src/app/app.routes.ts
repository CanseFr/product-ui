import { Routes } from '@angular/router';
import {Product} from './pages/product/product';
import {AddProduct} from './pages/add-product/add-product';
import {UpdateProduct} from './pages/update-product/update-product';
import {SearchByCategory} from './pages/search-by-category/search-by-category';

export const routes: Routes = [
  {path: 'products', component: Product},
  {path: 'add-product', component: AddProduct},
  {path: 'update-product/:id', component: UpdateProduct},
  {path: 'search-by-cat', component: SearchByCategory},
  {path: '',redirectTo:"products",pathMatch:"full", },
];
