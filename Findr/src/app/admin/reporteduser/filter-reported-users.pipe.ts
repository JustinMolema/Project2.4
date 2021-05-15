import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterReportedUsers'
})
export class FilterReportedUsersPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;
    
        searchText = searchText.toLocaleLowerCase();
        return items.filter(it => {
            if (it["name"].toLocaleLowerCase().includes(searchText)) return true;
            if (it["reason"].toLocaleLowerCase().includes(searchText)) return true;
            if (it["date"].toLocaleLowerCase().includes(searchText)) return true;

            return false;
        })
    }

}