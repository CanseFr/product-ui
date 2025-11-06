import {Pipe, PipeTransform} from '@angular/core';
import {ProductType} from '../models/product';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: ProductType[], filterText: string): ProductType[] {
    return list.filter(i => i.nameProduct!.toLowerCase().includes(filterText)
    )
  }

}
