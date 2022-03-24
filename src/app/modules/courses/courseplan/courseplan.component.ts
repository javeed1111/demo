import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
// import { DatePipe } from '@angular/common'
export interface TitleData {
  // sno: number;
  Actions: string;
  titleName: string;
}

@Component({
  selector: 'app-courseplan',
  templateUrl: './courseplan.component.html',
  styleUrls: ['./courseplan.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CourseplanComponent implements OnInit {
  selectedProduct: any | null = null;
  displayedColumns = ['actions','titleName', ];
  dataSource: MatTableDataSource<TitleData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;
  cours: any;
  planId: number;
  startdate = new Date();
  EndDate = new Date();
  horizontalStepperForm: FormGroup;
  verticalStepperForm: FormGroup;
  active: boolean;
  selected: boolean = false;
  offerapply: boolean = true;
  OfferPrice: any;
  todayDate = new Date();
  ListOfCourses: any = [];
  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    // public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.GetCourse();
    // Horizontal stepper form
    this.horizontalStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        planName: ['', [Validators.required]],
        price: ['0', [Validators.required]],
        offerApplicable: [''],
        offerPrice: ['0'],
        effectiveDate: ['', Validators.required],
        effectiveTill: ['', Validators.required],
      }),
      step2: this._formBuilder.group({
        courseId: [''],
        //   title          : this._formBuilder.group({
        //     titleId     : ['']
        // })
        // title : ['']
      })
    });
    const ctrl = this.horizontalStepperForm.controls.step1.get('offerPrice');
    ctrl.disable();

  }
  change(event) {
    debugger
    if (this.horizontalStepperForm.invalid) {
      return;
    }
    const dataa = this.horizontalStepperForm.getRawValue();
    this.ListOfCourses= dataa.step2.courseId;
    if (event.isUserInput) {
      console.log(event.source.value, event.source.selected);
      // this._authService.GettitleById(this.ListOfCourses).subscribe((finalresult: any) => {
      //   debugger
      //   // var finalresult = JSON.parse(finalresult);
      //   if (finalresult.status == "200") {
      //     debugger
      //     this.dataSource = new MatTableDataSource(finalresult.result);
      //     this.dataSource.paginator = this.paginator;
      //     this.dataSource.sort = this.sort;
      //     this.cours = finalresult.result;
      //     this.selected = true
      //     console.log('techs', this.cours)
      //   }
      //   else {

      //   }
      // });
    }
  }
  onChange() {
    debugger
    if (this.horizontalStepperForm.invalid) {
      return;
    }
    const dataa = this.horizontalStepperForm.getRawValue();
    this.ListOfCourses= dataa.step2.courseId;
    var data = {
      Id: this.ListOfCourses,
    }
      this._authService.GettitleById(data).subscribe((finalresult: any) => {
        debugger
        // var finalresult = JSON.parse(finalresult);
        if (finalresult.status == "200") {
          debugger
          this.dataSource = new MatTableDataSource(finalresult.result);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.cours = finalresult.result;
          this.selected = true
          console.log('course', this.cours)
        }
        else {

        }
      });
  }
  toggleCompleted($event: MatSlideToggleChange): void {
    debugger
    if ($event.checked != undefined) {
      this.active = $event.checked;
      if (this.active == true) {
        const ctrl = this.horizontalStepperForm.controls.step1.get('offerPrice');
        ctrl.enable();
      }
      else {
        const ctrl = this.horizontalStepperForm.controls.step1.get('offerPrice');
        ctrl.disable();
        ctrl.setValue('0')
        
      }

    }
    else {
      this.active = false;
      // this.horizontalStepperForm.controls.step1['offerPrice'].enable();

    }
    //this.active=this.filters.hideCompleted$.next(change.checked);
  }
  applyFilter(filterValue: string) {
    //debugger
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  GetCourse() {
    //debugger
    this._authService.GetCourses().subscribe((finalresult: any) => {
      //debugger
      var finalresult = JSON.parse(finalresult);
      if (finalresult.status == "200") {
        //debugger
        //this.dataSource= finalresult.result;
        this.cours = finalresult.result;
        //this.roles = finalresult.result;
        console.log('techs', this.cours)
        //const dataSource = this.roles ;
      }
      else {

      }
    });
  }
  onChangeDemo(ob: MatCheckboxChange) {
    console.log(ob.checked + " => " + ob.source.id);
  }
  // getDateItem(date: Date): string {
  //   debugger
  //   return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  // }

  savefree(): void {
    debugger
    // Return if the form is invalid
    if (this.horizontalStepperForm.invalid) {
      return;
    }
    const dataa = this.horizontalStepperForm.getRawValue();
    if (this.active == undefined) {
      this.active = false;
      // this.horizontalStepperForm.controls['offerPrice'].disable();
      this.OfferPrice = '0'
    }
    else {
      // this.horizontalStepperForm.controls['offerPrice'].enable();
      this.OfferPrice = dataa.step1.offerPrice;
    }
    var mindate = new Date(dataa.step1.effectiveDate);
    var maxdate = new Date(dataa.step1.effectiveTill);

    if (mindate >= maxdate) {
      this.showAlert = true;

      this.alert = {
        type: 'success',
        message: "EffectiveFromdate Should not be Greaterthan or equal to EffectiveTillDate"
      };
      setTimeout(() => {
        this.showAlert = false;
        // this._router.navigate(['/courses/course']);
      }, 3500);
     
      return;
    }
    // var days = parseInt(dataa.days);
    // this.EndDate.setDate(this.startdate.getDate() + days);
    var data = {
      PlanName: dataa.step1.planName,
      Price: dataa.step1.price,
      OfferPrice: this.OfferPrice,
      EffectiveFrom: dataa.step1.effectiveDate,
      EffectiveTill: dataa.step1.effectiveTill,
      ListOfCourses: dataa.step2.courseId,
      IsOffer: this.active,
      // Title:dataa.step2.titleId,
      CreatedBy: parseInt(localStorage.getItem("LoginId")),
    }
    this._authService.AddCoursePlan(data).subscribe((result: any) => {
      //   var data = {
      //     TechnologyName: contact.technologyName,
      //     // ImageURL:
      //      CreatedBy: parseInt(localStorage.getItem("LoginId")),
      //     //  IsActive: this.active,
      //  }
      //   this._authService.Addtechnology(data).subscribe((result: any) => {
      //debugger
      var result = JSON.parse(result);
      if (result.status == "200") {
        //debugger

        // Show the alert
        this.showAlert = true;

        this.alert = {
          type: 'success',
          message: result.message
        };

        setTimeout(() => {
          this._router.navigate(['/courses/technology']);
        }, 1000);
      }
      else {
        this.alert = {
          type: 'error',
          message: result.error

        };
        this.showAlert = true;
      }
      (error) => {

      }
    });
  }

}
