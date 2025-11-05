import {Injectable} from '@angular/core';
import {ProductType} from '../models/product';
import {CategoryType} from '../models/category';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders(
    { 'Content-Type': 'application/json; charchars=utf-8' },
  ),
}

const apiUrl = "http://localhost:8080"

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products!: ProductType[]
  // categories: CategoryType[]

  constructor(private http: HttpClient) {
    // this.categories = [
    //   {id: 1, name: 'PC'},
    //   {id: 2, name: 'Imprimante'},
    // ]
  }

  listProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${apiUrl}/product/api`)
  }

  addProduct(product: ProductType): Observable<ProductType> {
    return this.http.post<ProductType>(`${apiUrl}/product/api`, product, httpOptions)
  }

  deleteProduct(index: number): Observable<ProductType> {
    return this.http.delete(`${apiUrl}/product/api/${index}`, httpOptions)
  }

  getProductById(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`${apiUrl}/product/api/${id}`)
  }

  updateProduct(product: ProductType): Observable<ProductType> {
    return this.http.put<ProductType>(`${apiUrl}/product/api`, product, httpOptions)
  }

}
