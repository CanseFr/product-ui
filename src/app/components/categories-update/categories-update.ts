import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CategoryType} from '../../models/category';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-categories-update',
  imports: [
    FormsModule
  ],
  templateUrl: './categories-update.html',
  styleUrl: './categories-update.css',
})
export class CategoriesUpdate {
  @Input() categorie!: CategoryType
  @Input() isModification!: boolean
  @Output() updateCategory = new EventEmitter<CategoryType>();

  handleSaveCategory(){
    this.updateCategory.emit(this.categorie)
  }

}
