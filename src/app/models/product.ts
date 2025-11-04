import {CategoryType} from './category';

export interface ProductType{
  id?:number;
  name?:string;
  price?:number;
  dateCreation?:Date;
  category?: CategoryType;
}
