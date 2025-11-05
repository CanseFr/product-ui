import {Injectable} from '@angular/core';
import {ProductType} from '../models/product';
import {CategoryType} from '../models/category';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiProduct, httpOptions} from '../config';


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
    return this.http.get<CategoryType[]>(`${apiProduct}/cat`)
  }

}
