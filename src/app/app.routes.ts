import { Routes } from '@angular/router';
import {Product} from './pages/product/product';
import {AddProduct} from './pages/add-product/add-product';
import {UpdateProduct} from './pages/update-product/update-product';
import {SearchByCategory} from './pages/search-by-category/search-by-category';
import {SearchByName} from './pages/search-by-name/search-by-name';

export const routes: Routes = [
  {path: 'products', component: Product},
  {path: 'add-product', component: AddProduct},
  {path: 'update-product/:id', component: UpdateProduct},
  {path: 'search-by-cat', component: SearchByCategory},
  {path: 'search-by-name', component: SearchByName},
  {path: '',redirectTo:"products",pathMatch:"full", },
];
