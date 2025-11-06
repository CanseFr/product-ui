import {Injectable} from '@angular/core';
import {ProductType} from '../models/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiCategory, apiProduct, httpOptions} from '../config';
import {CategoryType} from '../models/category';


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
