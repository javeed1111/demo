
import { Component,ChangeDetectorRef,NgZone,OnInit } from '@angular/core';
// import { OtherComponentsComponent } from '../../other-components.component';
// import { TableUtil } from '../../sharedServices/sharedServices/utils';

import { FuseUtilsService } from '@fuse/services/utils/utils.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { TableUtil } from '../sharedServices/utils';
import { AuthService } from 'app/core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { TableUtil } from 'app/modules/other-components/common/sharedServices/utils';

@Component({
  selector: 'app-referencelist',
  templateUrl: './referencelist.component.html',
  styleUrls: ['./referencelist.component.scss']
})
export class ReferencelistComponent implements OnInit {

  private cdr: ChangeDetectorRef
  roomsFilter:any;
  horizontalStepperForm: FormGroup;
   displayedColumns = [  'sno','studentName', 'courseName', 'mobileno','Email','invoice','totalamount'];

  isVisible=false;
  Visible=true;
  getdata:any=[];

  constructor(private _formBuilder: FormBuilder,
    private zone:NgZone,
    private approute: ActivatedRoute,private _router: Router,
    private _authService: AuthService,
    ) { }

  ngOnInit(): void {
  }



  startDate:string;
  public OnDateChange(event): void {
      debugger;
      const today = new Date(event);
      const yyyy = today.getFullYear();
      var mm = today.getMonth() + 1; // Months start at 0!
      var dd = today.getDate();

      if (dd < 10) dd = 0 + dd;
      if (mm < 10) mm = 0 + mm;

      const formattedToday = yyyy + '-' + mm + '-' + dd;

// document.getElementById('DATE').value = formattedToday;
  this.startDate=formattedToday
      // this.filterForm.controls.datepicker.setValue(event)
     
    }
    endDate:string;
  public OnEndDateChange(event): void {
      debugger;
      const today = new Date(event);
      const yyyy = today.getFullYear();
      var mm = today.getMonth() + 1; // Months start at 0!
      var dd = today.getDate();

      if (dd < 10) dd = 0 + dd;
      if (mm < 10) mm = 0 + mm;

      const formattedToday = yyyy + '-' + mm + '-' + dd;

// document.getElementById('DATE').value = formattedToday;
  this.endDate=formattedToday
      // this.filterForm.controls.datepicker.setValue(event)
     
    }
    searchedData:any=[]
  GetDailyenrolled(){
      this.isVisible=true
      // this.isVisible=true;
      debugger
          this._authService.GetDailyenrolled(this.startDate,this.endDate).subscribe((finalresult: any) => {
        debugger
        //console.log(finalresult);
        //this.getdata=finalresult.result;
        var finalresult = JSON.parse(finalresult);
        debugger
        console.log(finalresult)
 this.getdata = finalresult.result;
        debugger
        this.zone.run(() => { // <== added
          this.searchedData = finalresult.result;
      });
        
      //  if (finalresult.status == "200") {
    
          
      //     // for (let i = 0; i < this.getdata.length; i++) {
      //     //     this.getdata[i].courseName      
      //     // }
      //     }
      this.cdr.detectChanges();
      });
    }
    open(GetDailyenrolled){
      this.isVisible=true;
      GetDailyenrolled();
   }

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
    //   No: x.position,
    //   Name: x.name,
    //   Cellno: x.weight,
    //   Email: x.symbol
    
    customerName:x.customerName,
    email:x.email,
    mobileNumber:x.mobileNumber,
    courseName:x.courseName,
    invoiceNo:x.invoiceNo,
    invoiceDate:x.invoiceDate,
    totalAmount:x.totalAmount

    }));
   TableUtil.exportArrayToExcel(onlyNameAndSymbolArr, "Student Reports");
  }

}
