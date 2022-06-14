import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
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
  selector: 'app-courseplanedit',
  templateUrl: './courseplanedit.component.html',
  styleUrls: ['./courseplanedit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class CourseplaneditComponent implements OnInit {
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
  courseIds: any;
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
  Id: any;
  disabled: boolean=false;
  show: boolean=true;
  offerpricenbind: any;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private approute: ActivatedRoute,
    // public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    debugger
    var loginId = localStorage.getItem("LoginId");
    var pcid = this.approute.snapshot.params['pcid'];
    var planid = this.approute.snapshot.params['planid'];
    var value = this.approute.snapshot.params['value'];
    this.GetCourse();
    // Horizontal stepper form
    this.horizontalStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
        planName: ['', [Validators.required]],
        price: ['0', [Validators.required]],
        isOffer: [''],
        offerPrice: ['0'],
        effectiveFrom: ['', ],
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
    this.Edit(pcid,planid,value);

  }
  Edit(pcid:any,planid:any,value:any) {
    debugger
    if (value == "view") {
      this.disabled=true;
      this.horizontalStepperForm.controls.step1.get('planName').disable();
      this.horizontalStepperForm.controls.step1.get('price').disable();
      this.horizontalStepperForm.controls.step1.get('isOffer').disable();
     // this.horizontalStepperForm.controls.step1.get('offerPrice').disable();
      this.horizontalStepperForm.controls.step1.get('effectiveFrom').disable();
      this.horizontalStepperForm.controls.step1.get('effectiveTill').disable();
      this.horizontalStepperForm.controls.step2.get('courseId').disable();
      this.show=false
  }
  else
  {
    this.disabled=false;
      this.horizontalStepperForm.controls.step1.get('planName').enable();
      this.horizontalStepperForm.controls.step1.get('price').enable();
      this.horizontalStepperForm.controls.step1.get('isOffer').enable();
      // this.horizontalStepperForm.controls.step1.get('offerPrice').enable();
      this.horizontalStepperForm.controls.step1.get('effectiveFrom').enable();
      this.horizontalStepperForm.controls.step1.get('effectiveTill').enable();
      this.horizontalStepperForm.controls.step2.get('courseId').enable();
  }
    // this.Id = id;
    this._authService.GetcourseplanById(pcid,planid).subscribe((finalresult: any) => {
      debugger
      console.log(finalresult);
      //  var finalresult = JSON.parse(finalresult);
      if (finalresult.status == "200") {
        debugger
        for(let i=0;i<finalresult.result.length;i++){
          this.horizontalStepperForm.controls.step1.patchValue(finalresult.result[0]);
          this.offerpricenbind =this.horizontalStepperForm.controls.step1.get('offerPrice').value;
        if(this.horizontalStepperForm.controls.step1.get('isOffer').value==true && value == "edit")
        {
       this.horizontalStepperForm.controls.step1.get('offerPrice').enable();
        }
        //let courseid:[]
        let courseidarray=finalresult.result[i].courseId
        this.Filter.push(courseidarray)
        // this.horizontalStepperForm.controls.step2.set('courseId')=this.Filter
        // courseId
        
          //this.courseIds=this.horizontalStepperForm.controls.step2.patchValue(finalresult.result[i]);
         // this.courseIds.courseId=this.Filter;

        }
        this.courseIds=this.horizontalStepperForm.controls.step2.get('courseId')
        this.courseIds=this.Filter;
        // let courseids = {}
        // this.courseidarray.forEach(x => {
        //   courseids = JSON.parse(JSON.stringify(x));
        // });

      //   this.horizontalStepperForm.controls.step1.patchValue(finalresult);
      //   this.offerpricenbind =this.horizontalStepperForm.controls.step1.get('offerPrice').value;
      //   if(this.horizontalStepperForm.controls.step1.get('isOffer').value==true && value == "edit"){
      //  this.horizontalStepperForm.controls.step1.get('offerPrice').enable();
      //   }
      //   this.horizontalStepperForm.controls.step2.patchValue(finalresult);
        const course = this.horizontalStepperForm.getRawValue();
        // if (course.duration == 0) {
        //   this.courseForm.controls['duration'].setValue("")
        // }
        // if (course.fees == 0) {
        //   this.courseForm.controls['fees'].setValue("")
        // }
      }
      else {

      }
    });
  }
  checkprice(){
    debugger
    const dataa = this.horizontalStepperForm.getRawValue();
    var price = dataa.step1.price;
    var offerprice = dataa.step1.offerPrice;
    if(price<=offerprice){
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
  Back(){
    this._router.navigate(['/courses/courseplanlist/']);
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
      let unmatchedFilteredData = []
      if (this.Filter.length > 0) {
        this.Filter.forEach((element, i) => {
          debugger
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
        debugger
        var finalresult = JSON.parse(finalresult);
        if (finalresult.status == "200") {
          debugger

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
          debugger;
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
  onChangecheckbox(event: MatCheckboxChange) {
    debugger
    console.log(event.checked + " => " + event.source.value);
  // }
}
 
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
        if(this.offerpricenbind!=0){
          ctrl.setValue(this.offerpricenbind)
        }
        else{
          ctrl.setValue('0')
        }

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
    var mindate = new Date(dataa.step1.effectiveFrom);
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
    if(price<=offerprice){
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
    var data = {
      PlanName: dataa.step1.planName,
      Price: dataa.step1.price,
      OfferPrice: this.OfferPrice,
      EffectiveFrom: dataa.step1.effectiveFrom,
      EffectiveTill: dataa.step1.effectiveTill,
      // ListOfCourses: dataa.step2.courseId,
      ListOfCourses: ListOfCourse,
      IsOffer: this.isofferactive,
      PlanId: this.planId,
      // Title:dataa.step2.titleId,
      CreatedBy: parseInt(localStorage.getItem("LoginId")),
    }
    this._authService.UpdateCoursePlan(data).subscribe((result: any) => {
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
