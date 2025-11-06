import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategoryType} from '../../models/category';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {

  @Input() categories!: CategoryType[]
  @Output() categoryId = new EventEmitter<number>()
  @Output() categorySelected = new EventEmitter<CategoryType>()

  handleDeleteCat(catId: number){
    this.categoryId.emit(catId)
  }

  handleEditCat(cat: CategoryType){
    this.categorySelected.emit(cat)
  }

}
