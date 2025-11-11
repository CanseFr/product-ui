import {Injectable, OnInit} from '@angular/core';
import {ProductType} from '../models/product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiCategory, apiProduct, httpOptions} from '../config';
import {CategoryType} from '../models/category';
import {AuthenticationService} from './authentication.service';


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient, private  authService:AuthenticationService) {
  }


  listProducts(): Observable<ProductType[]> {
    let jwt = this.authService.getToken()
    let httpHeaders = new HttpHeaders({'Authorization': jwt, 'Content-Type': 'application/json; charchars=utf-8'})
    return this.http.get<ProductType[]>(`${apiProduct}`, {headers: httpHeaders})
  }

  addProduct(product: ProductType): Observable<ProductType> {
    let jwt = this.authService.getToken()
    let httpHeaders = new HttpHeaders({'Authorization': jwt})
    return this.http.post<ProductType>(`${apiProduct}`, product, {headers: httpHeaders})
  }

  deleteProduct(index: number): Observable<ProductType> {
    let jwt = this.authService.getToken()
    let httpHeaders = new HttpHeaders({'Authorization': jwt})
    return this.http.delete(`${apiProduct}/${index}`, {headers: httpHeaders})
  }

  getProductById(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`${apiProduct}/${id}`)
  }

  updateProduct(product: ProductType): Observable<ProductType> {
    let jwt = this.authService.getToken()
    let httpHeaders = new HttpHeaders({'Authorization': jwt})

    return this.http.put<ProductType>(`${apiProduct}`, product, {headers: httpHeaders})
  }

  getCategories() {
    return this.http.get<CategoryType[]>(`${apiCategory}`)
  }

  findByCategory(idCat: number) {
    return this.http.get<ProductType[]>(`${apiProduct}/prod-by-cat/${idCat}`)
  }

  findByName(name: string) {
    return this.http.get<ProductType[]>(`${apiProduct}/prod-by-name/${name}`)
  }

  createCategory(category: CategoryType){
    return this.http.post<CategoryType>(`${apiCategory}`,category, httpOptions)
  }

  deleteCategoryById(catId: number){
    return this.http.delete(`${apiCategory}/${catId}`, httpOptions)
  }
}
