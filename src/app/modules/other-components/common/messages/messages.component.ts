import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { OtherComponentsComponent } from '../../other-components.component';
import { TableUtil } from '../sharedServices/utils';
//import { OtherComponentsComponent } from 'app/modules/admin/ui/other-components/other-components.component';
@Component({
    selector   : 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent
{

   
    courses: any;
    courseId:any
    isVisible=false;
    getdata:any=[];
   
    
    displayedColumns = [  'sno','studentName', 'courseName', 'mobileno','Email','invoice','totalamount'];
    relatedcourses:any;
    // disableSelect = new FormControl(false);
    selected = 'none';
    newid: any;
    courseName:any;
    dataSource = new MatTableDataSource<any>(this.getdata);

    @ViewChild(MatPaginator) paginator: MatPaginator;
  
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
    constructor( private approute: ActivatedRoute, private _formBuilder: FormBuilder,private _activatedroute: ActivatedRoute,private _authService: AuthService,private _otherComponentsComponent: OtherComponentsComponent)
    {
    }
    ngOnInit(): void
    {
        this.GetCourses();
       
    }

    // setToday() {
    //     this.startDate = new Date();
    // }
   
    startDate:string;
    public OnDateChange(event): void {
        //debugger;
        const today = new Date(event);
        const yyyy = today.getFullYear();
        var mm = today.getMonth() + 1; // Months start at 0!
        var dd = today.getDate();
        if (dd < 10) dd = 0 + dd;
        if (mm < 10) mm = 0 + mm;
          const formattedToday = yyyy + '-' + mm + '-' + dd;
    this.startDate=formattedToday            
      }

      endDate:string;
    public OnEndDateChange(event): void {
       // debugger;
        const today = new Date(event);
        const yyyy = today.getFullYear();
        var mm = today.getMonth() + 1; // Months start at 0!
        var dd = today.getDate();

        if (dd < 10) dd = 0 + dd;
        if (mm < 10) mm = 0 + mm;

        const formattedToday = yyyy + '-' + mm + '-' + dd;
    this.endDate=formattedToday
      }

      

    
      GetCourses() {       
            this._authService.GetCourses().subscribe((finalresult: any) => {
              this.courses = JSON.parse(finalresult);
              this.courses = this.courses.result;
            })
          }


          
          slectedCourse:any;
      Getbycoursename(){
        this.isVisible=true
            debugger
            let courseName= this.courses. find(x => {
              
                return x.courseId ===this.slectedCourse

                })
            this._authService.Getbycoursename(courseName.courseName, this.startDate,this.endDate).subscribe((finalresult: any) => {
          debugger
          //console.log(finalresult);
          //this.getdata=finalresult.result;
          var finalresult = JSON.parse(finalresult);
          debugger
          console.log(finalresult)
   this.getdata = finalresult.result;
   
    });
  }

// searchedData:any=[]
// GetDailyenrolled(){
//     this.isVisible=true
//     // this.isVisible=true;
//     debugger
//         this._authService.GetDailyenrolled(this.startDate,this.endDate).subscribe((finalresult: any) => {
//       debugger
//       //console.log(finalresult);
//       //this.getdata=finalresult.result;
//       var finalresult = JSON.parse(finalresult);
//       debugger
//       console.log(finalresult)
// this.getdata = finalresult.result;
//       debugger
// });
// }
  open(Getbycoursename){
    this.isVisible=true;
    Getbycoursename();
 }

 // close(){
 //     this.Visible=false;
 // }

 reset(){
     window.location.reload();
 }



exportTable() {
    TableUtil.exportTableToExcel("ExampleMaterialTable");
  }

  exportNormalTable() {
    TableUtil.exportTableToExcel("ExampleNormalTable");
  }

  exportArray() {
    const onlyNameAndSymbolArr: Partial<any>[] = this.getdata.map(x => ({
      
    customerName:x.customerName,
    email:x.email,
    mobileNumber:x.mobileNumber,
    courseName:x.courseName,
    invoiceNo:x.invoiceNo,
    invoiceDate:x.invoiceDate,
    totalAmount:x.totalAmount
    }));
   TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, "RegistrationCourseName Reports");
  }

    toggleDrawer(): void
    {
        // Toggle the drawer
        this._otherComponentsComponent.matDrawer.toggle();
    }
}
