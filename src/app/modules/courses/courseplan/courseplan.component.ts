import { ThrowStmt } from '@angular/compiler';
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
import moment from 'moment';

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
  checkeddata: any = [];
  showonwebsite: boolean=true;

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
        effectiveDate: [new Date(), ],
        effectiveTill: ['', ],
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
    //this.horizontalStepperForm.controls.step1['effectiveDate'].setValue(new Date());

  }
  Back() {
    this._router.navigate(['/courses/courseplanlist/']);
  }
  checkprice() {
    
    const dataa = this.horizontalStepperForm.getRawValue();
    var price = dataa.step1.price;
    var offerprice = dataa.step1.offerPrice;
    if (price <= offerprice) {
      this.showAlert = true;

      this.alert = {
        type: 'success',
        message: "Offer Price Should not be Greaterthan or equal to Price"
      };
      setTimeout(() => {
        this.showAlert = false;
        // this._router.navigate(['/courses/course']);
      }, 3500);

      return;

    }

  }
  change(itemObj, event) {
    
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
      let unmatchedFilteredData = []
      if (this.Filter.length > 0) {
        this.Filter.forEach((element, i) => {
          
          if (element.courseId != itemObj.courseId) {
            unmatchedFilteredData.push(element)
          }
        });
      }
      this.Filter = unmatchedFilteredData

      this.dataSource = new MatTableDataSource(this.Filter);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selected = true
      console.log('techs', this.cours)
      return false;
    }
    if (event.isUserInput) {
      console.log(event.source.value, event.source.selected);
      this._authService.GetCourseContent().subscribe((finalresult: any) => {
        
        var finalresult = JSON.parse(finalresult);
        if (finalresult.status == "200") {
          

          let filteredData = this.cours.filter(x => x.courseId == event.source.value)
          let filteredData1 = finalresult.result.filter(x => x.courseId == event.source.value)
          let chapters = {}
          filteredData.forEach(x => {
            chapters = JSON.parse(JSON.stringify(x));
          });
          let content = {}
          filteredData1.forEach(x => {
            content = JSON.parse(JSON.stringify(x));
          });

          filteredData1.forEach(y => {
            if (chapters['courseName'].includes('-') == true) 
            {
              chapters['courseName'] = chapters['courseName'].split('-')[0] + "-" + y.chapter
            }
            else 
            {
              chapters['courseName'] = chapters['courseName'] + "-" + y.chapter
            }
            let data = { courseId: chapters['courseId'], title: chapters['courseName'], chapterId: y.id }
            this.Filter.push(data)
          })
          ;
          this.dataSource = new MatTableDataSource(this.Filter);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // this.cours = finalresult.result;
          this.selected = true
          // console.log('techs', this.cours)
        }
        else {

        }
      });
    }
  }

  onwebsite($event: MatSlideToggleChange): void {
    
    if ($event.checked == undefined || $event.checked == true) {
      this.showonwebsite = $event.checked;
    }
    else {
      this.showonwebsite = false;
      // this.isofferactive = false;
    }

  }

  onChangecheckbox(event: MatCheckboxChange, chapterid, courseid) {
    
    console.log(event.checked + " => " + event.source.value);
    let data =
    {
      CourseId: courseid,
      ChapterId: chapterid
    }

    this.checkeddata.push(data);
    // checkeddata.forEach(x => {
    //   content = JSON.parse(JSON.stringify(x));
    // });

    // }
  }
  // onChange() {
  //   
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
  //     
  //     // var finalresult = JSON.parse(finalresult);
  //     if (finalresult.status == "200") {
  //       
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
  debugger
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  GetCourse() {
    debugger
    this._authService.GetCourses().subscribe((finalresult: any) => {
      //
      var finalresult = JSON.parse(finalresult);
      if (finalresult.status == "200") {
        //
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
  //   
  //   return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  // }

  savecourseplan(): void {
    
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
    if(this.showonwebsite==undefined){
      this.showonwebsite=true
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
    var price = dataa.step1.price;
    var offerprice = dataa.step1.offerPrice;
    if (price <= offerprice) {
      this.showAlert = true;

      this.alert = {
        type: 'success',
        message: "Offer Price Should not be Greaterthan or equal to Price"
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
    var code = Math.floor(100000 + Math.random() * 900000) + 1;
  // let effectiveDate =  moment(dataa.step1.effectiveDate).format("DD-MM-YYYY")
  // let effectiveDate=dataa.step1.effectiveFrom.format("DD-MM-YYYY")

  // let effectiveTill =  moment(dataa.step1.effectiveTill).format("DD-MM-YYYY")
    var data = {
      PlanName: dataa.step1.planName,
      Price: dataa.step1.price,
      OfferPrice: this.OfferPrice,
      EffectiveFrom: dataa.step1.effectiveDate,
      ShowOnWebsite:this.showonwebsite,
      // EffectiveTill: dataa.step1.effectiveTill.format("DD-MM-YYYY"),
      ListOfChapters: this.checkeddata,
      ListOfCourses: ListOfCourse,
      IsOffer: this.isofferactive,
      // UniqueId: code,
      // Title:dataa.step2.titleId,
      CreatedBy: parseInt(localStorage.getItem("LoginId")),
    }
    this._authService.AddCoursePlan(data).subscribe((result: any) => {
      //
      var result = JSON.parse(result);
      if (result.status == "200") {
        

        // Show the alert
        this.showAlert = true;

        this.alert = {
          type: 'success',
          message: result.message
        };

        setTimeout(() => {
          this._router.navigate(['/courses/courseplanlist']);
        }, 1000);
      }
      else if (result.status == "-101") {
        

        // Show the alert
        this.showAlert = true;

        this.alert = {
          type: 'error',
          message: result.message
        };

        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
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
