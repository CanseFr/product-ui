import {CategoryType} from './category';

export class CategoryWrapper {
  _embedded!: {categories: CategoryType[]}
}
