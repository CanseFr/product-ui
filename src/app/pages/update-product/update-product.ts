import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product-service';
import {ActivatedRoute} from '@angular/router';
import {ProductType} from '../../models/product';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

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

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute,) {
      this.param = this.activatedRoute.snapshot.paramMap.get('id')!
      this.product = this.productService.getProductById(Number(this.param))!
  }

  ngOnInit(): void {
    console.log(this.param)
  }

  updateProduct() {
    this.productService.updateProduct(this.product)
  }
}
