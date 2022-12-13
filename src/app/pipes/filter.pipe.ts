import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allContacts: [], searchKey:string , propName:string): any [] {
    const result:any =[];
   if(!allContacts || searchKey==='' || propName ===''){
     return allContacts;
   }
   allContacts.forEach((a:any)=>{
     if(a[propName].trim().toLowerCase().includes(searchKey.toLowerCase())){
       result.push(a);
     }
   });
    return result;
   
 }

}
