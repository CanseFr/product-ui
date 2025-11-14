import {Component, OnInit} from '@angular/core';
import {ProductType} from '../../models/product';
import {DatePipe} from '@angular/common';
import {ProductService} from '../../services/product-service';
import {RouterLink} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {apiProduct} from '../../config';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
  products: ProductType[] = [];

  constructor(private productService: ProductService, protected authService: AuthenticationService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts() {
    this.productService.listProducts()
      .subscribe(prods => {
        this.products = prods
        this.products.forEach(prod => this.getImages(prod))
      })
  }

  getImages(prod: ProductType){
      this.productService.loadImage(prod.image?.id!)
        .subscribe(img => prod.imageStr = 'data:' + img.type + ';base64,' + img.image )
  }

  deleteProduct(index: number) {
    let conf = confirm('Souhaitez vous supprimer ce produit ?');
    if (conf) {
      this.productService.deleteProduct(index)
        .subscribe(() => this.loadProducts())
    }
  }

}
