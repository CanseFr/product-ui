import {Injectable, OnInit} from '@angular/core';
import {ProductType} from '../models/product';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiCategory, apiImage, apiProduct, httpOptions} from '../config';
import {CategoryType} from '../models/category';
import {AuthenticationService} from './authentication.service';
import {Image} from '../models/Image';


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient, private  authService:AuthenticationService) {
  }


  listProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${apiProduct}`)
  }

  addProduct(product: ProductType): Observable<ProductType> {
    return this.http.post<ProductType>(`${apiProduct}`, product)
  }

  deleteProduct(index: number): Observable<ProductType> {
    return this.http.delete(`${apiProduct}/${index}`)
  }

  getProductById(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`${apiProduct}/${id}`)
  }

  updateProduct(product: ProductType): Observable<ProductType> {
    return this.http.put<ProductType>(`${apiProduct}`, product,)
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

  uploadImage(file: File, fileName: string, idProduct: number) {
    const imageFromData = new FormData();
    imageFromData.append('image', file, fileName);
    return this.http.post(`${apiImage}/upload/${idProduct}`, imageFromData)
  }

  loadImage(id:number){
    return this.http.get<Image>(`${apiImage}/${id}`)
  }

  deleteImage(id: number) {
    return this.http.delete<Image>(`${apiImage}/${id}`)
  }

}
