import { DataSource } from '@angular/cdk/collections';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 

    name: 'FilterData',

})
export class SearchPipe implements PipeTransform {
  debugger
  courseData: any;
  // transform(dataSource: any[], searchTxt: any): any[] {
  //   if(!dataSource || !dataSource.length) return dataSource;
  //   if(!searchTxt || !searchTxt.length) return dataSource;
  //   return dataSource.filter(item => {
  //     return item.technologyName.toString().toLowerCase().indexOf(searchTxt.toLowerCase())  > -1 ||item.courseName.toString().toLowerCase().indexOf(searchTxt.toLowerCase())  > -1 || item.courseName.toString().toLowerCase().indexOf(searchTxt.toLowerCase())  > -1
  //   });
  // }
  transform(value: number): string {
    var data = this.courseData.filter(
      (element) => element.position === value
    );
    return data[0].name;
  }

}