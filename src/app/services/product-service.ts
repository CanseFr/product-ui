import {Injectable} from '@angular/core';
import {ProductType} from '../models/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiCategory, apiProduct, httpOptions} from '../config';
import {CategoryWrapper} from '../models/category-wrapper';
import {CategoryType} from '../models/category';
import {Product} from '../pages/product/product';


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  listProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${apiProduct}`)
  }

  addProduct(product: ProductType): Observable<ProductType> {
    return this.http.post<ProductType>(`${apiProduct}`, product, httpOptions)
  }

  deleteProduct(index: number): Observable<ProductType> {
    return this.http.delete(`${apiProduct}/${index}`, httpOptions)
  }

  getProductById(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`${apiProduct}/${id}`)
  }

  updateProduct(product: ProductType): Observable<ProductType> {
    return this.http.put<ProductType>(`${apiProduct}`, product, httpOptions)
  }

  getCategories() {
    // return this.http.get<CategoryWrapper[]>(`${apiCategory}`)
    return this.http.get<CategoryType[]>(`${apiProduct}/cat`)
  }

  findByCategory(idCat:number){
    return this.http.get<ProductType[]>(`${apiProduct}/prod-by-cat/${idCat}`)
  }

}
