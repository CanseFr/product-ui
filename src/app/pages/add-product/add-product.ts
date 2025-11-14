import {Component, OnInit} from '@angular/core';
import {ProductType} from '../../models/product';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product-service';
import {CategoryType} from '../../models/category';
import {Router} from '@angular/router';
import {Image} from '../../models/Image';

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
  uploadedImage?: File;
  imagePath: any;

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.productService.getCategories()
      .subscribe(c => this.categories = c)
  }

  addProduct() {
    this.productService.uploadImage(this.uploadedImage!, this.uploadedImage?.name!)
      .subscribe((img: Image) => {
        this.newProduct.image = img;
        this.newProduct.category = this.categories.find(cat => cat.id === Number(this.categoryIdSelected))
        this.newProduct.dateCreated = new Date()

        this.productService.addProduct(this.newProduct)
          .subscribe(() => this.router.navigate(['/products']))
      })
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage!)
    reader.onload = () => this.imagePath = reader.result
  }

}
