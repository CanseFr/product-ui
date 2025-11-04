import {Component, OnInit} from '@angular/core';
import {ProductType} from '../../models/product';
import {DatePipe} from '@angular/common';
import {ProductService} from '../../services/product-service';

@Component({
  selector: 'app-product',
  imports: [
    DatePipe
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  products!: ProductType[];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.products = this.productService.listProducts();
    }
}
