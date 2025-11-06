import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ProductType} from '../../models/product';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product-service';

@Component({
  selector: 'app-search-by-name',
  imports: [
    DatePipe,
    FormsModule
  ],
  templateUrl: './search-by-name.html',
  styleUrl: './search-by-name.css',
})
export class SearchByName implements OnInit {
  products!: ProductType[];
  productName!: string

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
       this.productService.listProducts()
         .subscribe(p => this.products= p)
    }

  findProduct() {
    this.productService.findByName(this.productName)
      .subscribe(p=>this.products = p);
  }


}
