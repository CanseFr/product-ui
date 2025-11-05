import {Component, OnInit} from '@angular/core';
import {ProductType} from '../../models/product';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product-service';
import {CategoryType} from '../../models/category';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct implements OnInit {
  newProduct: ProductType = {} as ProductType;
  categories: CategoryType[] = [];
  categoryIdSelected: number | null = null;
  message?: string;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    // this.categories = this.productService.listCategory();
  }

  addProduct() {
    if (this.categoryIdSelected == null) return;
    // this.newProduct.category = this.productService.getCategoryById(this.categoryIdSelected)!;
    this.productService.addProduct(this.newProduct);
    this.message = `Produit ${this.newProduct.nameProduct} ajouté avec succès !`;
    this.router.navigate(['/products']);
  }

}
