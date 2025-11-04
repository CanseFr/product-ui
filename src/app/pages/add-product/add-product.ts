import {Component} from '@angular/core';
import {ProductType} from '../../models/product';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product-service';

@Component({
  selector: 'app-add-product',
  imports: [
    FormsModule
  ],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {

  newProduct!:ProductType;
  message?: string;

  constructor(private productService: ProductService) {
  }

  addProduct() {
    this.productService.addProduct(this.newProduct)
    this.message = "Produit " + this.newProduct.name + " ajouté avec succés !"
  }

}
