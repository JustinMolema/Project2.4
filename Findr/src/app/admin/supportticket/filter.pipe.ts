import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {
    monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    transform(items: any[], searchText: string): any[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLocaleLowerCase();

        return items.filter(it => {
            if (it["tag"].toLocaleLowerCase().includes(searchText)) return true;
            if (it["status"].toLocaleLowerCase().includes(searchText)) return true;
            if (this.monthNames[it["date"].getMonth()].toLocaleLowerCase().includes(searchText)) return true;

            return false;
        })
    }
}
