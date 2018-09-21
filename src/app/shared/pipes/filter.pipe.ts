import { Pipe, PipeTransform } from '@angular/core';
import { MegaUtils } from '../utils/mega-utils';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(mainArr: any[], searchText: string, property: string): any {
    return MegaUtils.filterArrayByString(mainArr, searchText);
  }

}
