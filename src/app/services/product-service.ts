import {Injectable} from '@angular/core';
import {ProductType} from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: ProductType[]

  constructor() {
    this.products = [
      {id: 1, name: "MacBook Pro", price: 1200, dateCreation: new Date("02/02/2025")},
      {id: 2, name: "Mic Mini", price: 1800, dateCreation: new Date("02/22/2025")},
      {id: 3, name: "MacBook Air", price: 1500, dateCreation: new Date("02/12/2025")}
    ]
  }

  listProducts() {
    return this.products;
  }

  addProduct(product: ProductType) {
    this.products.push(product);
  }

  deleteProduct(index:number){
    this.products.splice(index,1);
  }

}
