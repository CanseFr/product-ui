import {CategoryType} from './category';
import {Image} from './Image';

export interface ProductType{
  id?:number;
  nameProduct?:string;
  priceProduct?:number;
  dateCreated?:Date;
  category?: CategoryType;
  image?: Image;
  imageStr?:string;
}
