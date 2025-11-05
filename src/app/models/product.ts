import {CategoryType} from './category';

export interface ProductType{
  id?:number;
  nameProduct?:string;
  priceProduct?:number;
  dateCreated?:Date;
  category?: CategoryType;
}
