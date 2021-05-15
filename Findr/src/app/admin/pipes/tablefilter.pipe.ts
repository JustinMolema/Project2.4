import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablefilter'
})
export class TablefilterPipe implements PipeTransform {
    transform(items: any[], keys: string[], searchText: string): any[] {
        if (!items) return [];        
        if (!searchText) return items;
        searchText = searchText.toLocaleLowerCase();
        return items.filter(it => {
            for (let key of keys) {
                if (key == "time" || key == "subscribercount" || key == "warning") continue;
                if (it[key].toLocaleLowerCase().includes(searchText)) return true;
            }
            return false;
        })
    }
}