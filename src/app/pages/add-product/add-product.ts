import {Component, OnInit} from '@angular/core';
import {ProductType} from '../../models/product';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-product',
  imports: [
    FormsModule
  ],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct implements OnInit {

  newProduct = new ProductType();

  constructor() {
  }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    addProduct(): void {
    console.log(this.newProduct);
    }

}
