import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductType} from '../../models/product';
import {DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CategoryType} from '../../models/category';
import {Image} from '../../models/Image';

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
  param?: string
  categories!: CategoryType[]
  categoryIdSelected?: number
  image?:string;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts()
    this.getCategories()

  }

  getProducts(){
    this.param = this.activatedRoute.snapshot.paramMap.get('id')!
    this.productService.getProductById(Number(this.param))
      .subscribe(p => {
        this.product = p
        this.categoryIdSelected = p.category?.id
        this.productService.loadImage(p.image?.id!)
          .subscribe((i:Image) =>this.image = 'data:' + i.type + ';base64,' + i.image )
      })
        // this.getImage(p)
  // })
  }

  // getImage(p: ProductType) {
  //   this.productService.loadImage(p.image?.id!)
  //     .subscribe((i:Image) =>this.image = 'data:' + i.type + ';base64,' + i.image )
  // }

  getCategories() {
    this.productService.getCategories()
      .subscribe(c => {
        this.categories = c
        this.categoryIdSelected = this.product.category!.id
      })
  }

  updateProduct() {
    this.product.category = this.categories.find(cat => cat.id === Number(this.categoryIdSelected))
    this.productService.updateProduct(this.product)
      .subscribe(() => this.router.navigate(['/products']))
  }
}
