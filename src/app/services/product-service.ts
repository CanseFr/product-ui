import {Injectable} from '@angular/core';
import {ProductType} from '../models/product';
import {CategoryType} from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: ProductType[]
  categories: CategoryType[]

  constructor() {
    this.categories = [
      {id: 1, name: 'PC'},
      {id: 2, name: 'Imprimante'},
    ]
    this.products = [
      {id: 1, name: "MacBook Pro", price: 1200, dateCreation: new Date("02/02/2025"), category: {id: 1, name: 'PC'},},
      {id: 2, name: "Mic Mini", price: 1800, dateCreation: new Date("02/22/2025"), category: {id: 1, name: 'PC'},},
      {id: 3, name: "MacBook Air", price: 1500, dateCreation: new Date("02/12/2025"), category: {id: 1, name: 'PC'},},
      {id: 4, name: "Epson E342", price: 345, dateCreation: new Date("02/12/2025"), category: {id: 1, name: 'Imprimante'},}
    ]
  }

  listProducts() {
    return this.products;
  }

  listCategory() {
    return this.categories
  }

  addProduct(product: ProductType) {
    this.products.push(product);
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
  }

  getProductById(id: number) {
    return this.products.find(p => p.id == id)
  }

  getCategoryById(id: number) {
    return this.categories.find(p => p.id == id)
  }

  updateProduct(product: ProductType) {
    this.products = this.products.filter((p) => p.id !== product.id)
    this.products.push(product)
    this.products.sort((a, b) => a.id! - b.id!)
  }

}
