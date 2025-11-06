import {Component, OnInit} from '@angular/core';
import {ProductType} from '../../models/product';
import {DatePipe, TitleCasePipe} from '@angular/common';
import {CategoryType} from '../../models/category';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product-service';

@Component({
  selector: 'app-search-by-category',
  imports: [
    DatePipe,
    FormsModule,
    TitleCasePipe
  ],
  templateUrl: './search-by-category.html',
  styleUrl: './search-by-category.css',
})
export class SearchByCategory implements OnInit {

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getCategories()
      .subscribe(c => this.categories = c)
  }

  products!: ProductType[];
  idCategory!: number;
  categories!: CategoryType[]

  onChange() {
    this.productService.findByCategory(this.idCategory)
      .subscribe(p => this.products = p)
  }
}
