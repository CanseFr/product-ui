import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductType} from '../../models/product';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CategoryType} from '../../models/category';

@Component({
  selector: 'app-update-product',
  imports: [
    DatePipe,
    FormsModule
  ],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct implements OnInit {

  product!: ProductType
  param: string
  categories?: CategoryType[]
  categoryIdSelected?:number

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.param = this.activatedRoute.snapshot.paramMap.get('id')!
    this.product = this.productService.getProductById(Number(this.param))!
  }

  // Bug : Cat imprimante ...
  ngOnInit(): void {
    // this.categories = this.productService.listCategory()
    this.categoryIdSelected = this.product.category?.id
  }

  updateProduct() {
    // this.product.category = this.productService.getCategoryById(Number(this.categoryIdSelected))
    this.productService.updateProduct(this.product)
    this.router.navigate(['/products'])
  }
}
