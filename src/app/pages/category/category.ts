import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product-service';
import {CategoryType} from '../../models/category';
import {Categories} from '../../components/categories/categories';
import {CategoriesUpdate} from '../../components/categories-update/categories-update';

@Component({
  selector: 'app-category',
  imports: [
    Categories,
    CategoriesUpdate
  ],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {
  categories!: CategoryType[];
  categorySelected: CategoryType = {name:"", desc:""}
  isModification = false

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.getCategories().subscribe(c => this.categories = c)
  }

  handleUpdateCategory(category: CategoryType){
    this.productService.createCategory(category)
      .subscribe(()=> this.productService.getCategories()
        .subscribe(c => this.categories = c)
      )
    this.categorySelected = {name:"", desc:""};
    this.isModification = false
  }

  handleDeleteCateById(catId:number){
    this.productService.deleteCategoryById(catId)
      .subscribe(()=> this.productService.getCategories()
        .subscribe(c => this.categories = c)
      )
  }

  handleSelectedCat(cat: CategoryType){
    this.isModification = true
    this.categorySelected = cat
  }
}
