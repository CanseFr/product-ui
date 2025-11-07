import {Component, OnInit} from '@angular/core';
import {ProductType} from '../../models/product';
import {DatePipe} from '@angular/common';
import {ProductService} from '../../services/product-service';
import {RouterLink} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-product',
  imports: [
    DatePipe,
    RouterLink
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  products!: ProductType[];

  constructor(private productService: ProductService, protected authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts() {
    this.productService.listProducts()
      .subscribe(p => this.products = p)
  }

  deleteProduct(index: number) {
    let conf = confirm('Souhaitez vous supprimer ce produit ?');
    if (conf) {
      this.productService.deleteProduct(index)
        .subscribe(() => this.loadProducts())
    }
  }

}
