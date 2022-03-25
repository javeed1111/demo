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
export class list {
  // sno: number;
  CourseId: number;
}
export class titlelist {
  title: string;
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
  displayedColumns = ['actions', 'titleName',];
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
  isofferactive: boolean;
  selected: boolean = false;
  offerapply: boolean = true;
  OfferPrice: any;
  todayDate = new Date();
  ListOfCourses: any = [];
  Filter: any = [];
  titles: any;
  ListOfcheckedtitles: any = [];
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
        titlecheck: [''],
        //   title          : this._formBuilder.group({
        //     titleId     : ['']
        // })
        // title : ['']
      })
    });
    const ctrl = this.horizontalStepperForm.controls.step1.get('offerPrice');
    ctrl.disable();

  }
  change(itemObj, event) {
    debugger
    if (this.horizontalStepperForm.invalid) {
      return;
    }
    const dataa = this.horizontalStepperForm.getRawValue();
    if (event.source.selected) {
      this.ListOfCourses.push(itemObj.courseId)
    } else {
      let index = this.ListOfCourses.indexOf(itemObj.courseId);
      index != -1 ? this.ListOfCourses.splice(index, 1) : false;
      let matchIndex = -1
      if (this.Filter.length > 0) {
        this.Filter.forEach((element, i) => {
          if (element.courseId == itemObj.courseId) {
            matchIndex = i;
          }
        });
      }
      this.Filter.splice(matchIndex, 1);
      this.dataSource = new MatTableDataSource(this.Filter);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selected = true
      console.log('techs', this.cours)
      return false;
    }
    if (event.isUserInput) {
      console.log(event.source.value, event.source.selected);
      // this._authService.GetCourses().subscribe((finalresult: any) => {
        debugger
        // var finalresult = JSON.parse(finalresult);
        // if (finalresult.status == "200") {
          // debugger

          let filteredData = this.cours.filter(x => x.courseId == event.source.value)
          filteredData.forEach(x => this.Filter.push(x));

          this.dataSource = new MatTableDataSource(this.Filter);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.cours = finalresult.result;
          this.selected = true
          // console.log('techs', this.cours)
        // }
        // else {

        // }
      // });
    }
  }
  onChangecheckbox(event: MatCheckboxChange) {
    debugger
    // const dataa = this.horizontalStepperForm.getRawValue();
    // if (event.checked) {
    //   this.ListOfcheckedtitles.push( event.source.value)
    // } else {
    //   let index = this.ListOfCourses.indexOf(event.source.value);
    //   index != -1 ? this.ListOfCourses.splice(index, 1) : false;
    //   let matchIndex = -1
    //   if (this.Filter.length > 0) {
    //     this.Filter.forEach((element, i) => {
    //       if (element.courseId == event.source.value) {
    //         matchIndex = i;
    //       }
    //     });
    //   }
    //   this.Filter.splice(matchIndex, 1);
    //   // this.dataSource = new MatTableDataSource(this.Filter);
    //   // this.dataSource.paginator = this.paginator;
    //   // this.dataSource.sort = this.sort;
    //   // this.selected = true
    //   // console.log('techs', this.cours)
    //   // return false;
    // }
    // if (event.checked) {
    //   console.log(event.source.value, event.source.selected);
    //   // this._authService.GetCourses().subscribe((finalresult: any) => {
    //     debugger
    //     // var finalresult = JSON.parse(finalresult);
    //     // if (finalresult.status == "200") {
    //       // debugger

    //       let filteredData = this.cours.filter(x => x.courseId == event.source.value)
    //       filteredData.forEach(x => this.Filter.push(x));

    //       this.dataSource = new MatTableDataSource(this.Filter);
    //       this.dataSource.paginator = this.paginator;
    //       this.dataSource.sort = this.sort;
    //       // this.cours = finalresult.result;
    //       this.selected = true

    console.log(event.checked + " => " + event.source.value);
  // }
}
  // onChange() {
  //   debugger
  //   if (this.horizontalStepperForm.invalid) {
  //     return;
  //   }
  //   const dataa = this.horizontalStepperForm.getRawValue();
  //   this.ListOfCourses = dataa.step2.courseId;
  //   var ListOfCourse = [];
  //   for (var i = 0; i < this.ListOfCourses.length; i++) {
  //     const courselist = new list();
  //     if (this.ListOfCourses[i] != "") {
  //       courselist.CourseId = this.ListOfCourses[i];
  //       ListOfCourse.push(courselist);
  //     }
  //   }

  //   var data = {
  //     ListOfCourses: ListOfCourse,
  //   }
  //   this._authService.GettitleById(data).subscribe((finalresult: any) => {
  //     debugger
  //     // var finalresult = JSON.parse(finalresult);
  //     if (finalresult.status == "200") {
  //       debugger
  //       var ListOfTitles = [];
  //       for (var i = 0; i < finalresult.result.length; i++) {
  //         const titles = new titlelist();
  //         if (finalresult.result[i] != "") {
  //           titles.title = finalresult.result[i].title;
  //           ListOfTitles.push(titles);
  //         }
  //       }
  //       this.dataSource = new MatTableDataSource(ListOfTitles);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //       this.titles = finalresult.result;
  //       this.selected = true
  //       console.log('course', this.titles)
  //     }
  //     else {

  //     }
  //   });
  // }
  toggleCompleted($event: MatSlideToggleChange): void {
    debugger
    if ($event.checked != undefined) {
      this.isofferactive = $event.checked;
      if (this.isofferactive == true) {
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
      this.isofferactive = false;
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
 
  // getDateItem(date: Date): string {
  //   debugger
  //   return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  // }

  savecourseplan(): void {
    debugger
    // Return if the form is invalid
    if (this.horizontalStepperForm.invalid) {
      return;
    }
    const dataa = this.horizontalStepperForm.getRawValue();
    if (this.isofferactive == undefined) {
      this.isofferactive = false;
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
    this.ListOfCourses = dataa.step2.courseId;
    var ListOfCourse = [];
    for (var i = 0; i < this.ListOfCourses.length; i++) {
      if (this.ListOfCourses[i] != "") {
        const courselist = new list();
        courselist.CourseId = this.ListOfCourses[i];
        ListOfCourse.push(courselist);
      }
    }
    // var days = parseInt(dataa.days);
    // this.EndDate.setDate(this.startdate.getDate() + days);
    var data = {
      PlanName: dataa.step1.planName,
      Price: dataa.step1.price,
      OfferPrice: this.OfferPrice,
      EffectiveFrom: dataa.step1.effectiveDate,
      EffectiveTill: dataa.step1.effectiveTill,
      // ListOfCourses: dataa.step2.courseId,
      ListOfCourses: ListOfCourse,
      IsOffer: this.isofferactive,
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
