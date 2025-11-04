import { Component } from '@angular/core';
import {ProductType} from '../../models/product';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [
    DatePipe
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
    products!: ProductType[]

  constructor() {
      this.products= [
        {
          id: 1,
          name:"MacBook Pro" ,
          price: 1200,
          dateCreation: new Date("02/02/2025")
        },
        {
          id: 2,
          name:"Mic Mini",
          price: 1800,
          dateCreation: new Date("02/22/2025")
        },
        {
          id: 3,
          name:"MacBook Air" ,
          price: 1500,
          dateCreation: new Date("02/12/2025")
        }
      ]
  }
}
