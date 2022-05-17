import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { MatInputModule } from '@angular/material/input'
import { fuseAnimations } from '@fuse/animations';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER,SPACE} from '@angular/cdk/keycodes';

export interface Keywords {
  name: string;
}

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddcourseComponent implements OnInit {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA,SPACE] as const;
  keywords: Keywords[]=[];

  active: boolean;
  courseForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;
  Id: any;
  technology: any;
  technologyId
  files: Array<any> = new Array<any>();
  fileToUpload: File = null;
  todayDate = new Date();
  name: string;
  isofferactive: boolean;
  showonwebsite: boolean;
  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']
      // ['bold', 'italic', 'underline'],
      // [{align: []}, {list: 'ordered'}, {list: 'bullet'}],
      // ['clean']
    ]
  };
  OfferPrice: string;
  istax: boolean;
  status: boolean=false;


  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.GetTechnologys();
    this.courseForm = this._formBuilder.group({
      courseName: ['', [Validators.required]],
      technologyId: ['', []],
      Description: ['', []],
      Title: ['', []],
      Fulldescription: ['', []],
      Whatlearn: ['', []],
      requirements: ['', []],
      price: ['0', [Validators.required]],
      offerApplicable: [''],
      onwebsite: [''],
      offerPrice: ['0'],
      taxpercent:['0'],
      effectiveFrom: ['', Validators.required],
      effectiveTill: ['', Validators.required],
      courseheader: ['', []],
      courseurl:['', []],
      metadiscription: ['', []],
      metakeywords:['', []]
      // Duration     :['', [Validators.required]],
      // Fees         :['', []],
      // units        :['', []],
      // userchkactive: ['']

    });
    const ctrl = this.courseForm.controls['offerPrice']
    ctrl.disable();
    const ctrl1 = this.courseForm.controls['taxpercent']
    ctrl1.disable();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.keywords.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Keywords): void {
    debugger
    const index = this.keywords.indexOf(fruit);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  Status($event: MatSlideToggleChange): void{
    debugger
    if ($event.checked != undefined) {
      this.status = $event.checked;
    }
      else {
        this.status = $event.checked;

      }
  }

  onSelectFile(files: FileList) {
    //debugger
    if (files.length === 0)
      return;
    if (files.length > 0) {
      this.files = [];
      for (var i = 0; i < files.length; i++) {
        this.fileToUpload = files.item(i);
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(this.fileToUpload);
        this.name = this.fileToUpload.name.split(' ').join('-').replace(/[()]/g, "")
        this.files.push({ data: this.fileToUpload, fileName: this.name });
      }
    }
  }
  checkprice() {
    debugger
    const dataa = this.courseForm.getRawValue();
    var price = dataa.price;
    var offerprice = dataa.offerPrice;
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
  toggleCompleted($event: MatSlideToggleChange): void {
    debugger
    if ($event.checked != undefined) {
      this.isofferactive = $event.checked;
      if (this.isofferactive == true) {
        const ctrl = this.courseForm.controls['offerPrice'];
        ctrl.enable();
      }
      else {
        const ctrl = this.courseForm.controls['offerPrice'];
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

  check($event: MatSlideToggleChange): void {
    debugger
    if ($event.checked != undefined) {
      this.istax = $event.checked;
      if (this.istax == true) {
        const ctrl = this.courseForm.controls['taxpercent'];
        ctrl.enable();
      }
      else {
        const ctrl = this.courseForm.controls['taxpercent'];
        ctrl.disable();
        ctrl.setValue('0')

      }

    }
    else {
      this.istax = false;
      // this.horizontalStepperForm.controls.step1['offerPrice'].enable();

    }
    //this.active=this.filters.hideCompleted$.next(change.checked);
  }
  onwebsite($event: MatSlideToggleChange): void {
    debugger
    if ($event.checked == undefined || $event.checked == true) {
      this.showonwebsite = $event.checked;
    }
    else {
      this.showonwebsite = false;
      // this.isofferactive = false;
    }

  }
  GetTechnologys() {
    //debugger
    this._authService.GetTechnologies().subscribe((finalresult: any) => {
      //debugger
      var finalresult = JSON.parse(finalresult);
      if (finalresult.status == "200") {
        //debugger
        //this.dataSource= finalresult.result;
        this.technology = finalresult.result;
        //this.roles = finalresult.result;
        console.log('techs', this.technology)
        //const dataSource = this.roles ;
      }
      else {

      }
    });
  }
  cancel() {
    this._router.navigate(['/courses/course/']);
    setTimeout(() => {
      window.location.reload();
    }, 10);

  }
  AddCourse() {
    debugger
    this.showAlert = false;
    if (this.courseForm.invalid) {
      return;
    }
    const course = this.courseForm.getRawValue();
    if (this.isofferactive == undefined) {
      this.isofferactive = false;
      // this.horizontalStepperForm.controls['offerPrice'].disable();
      this.OfferPrice = '0'
    }
    else {
      // this.horizontalStepperForm.controls['offerPrice'].enable();
      this.OfferPrice = course.offerPrice;
    }
    if(this.showonwebsite==undefined){
      this.showonwebsite=true
    }
    
    const formData: FormData = new FormData();
    formData.append("CourseName", course.courseName)
    formData.append("CreatedBy", (localStorage.getItem("LoginId")));
    formData.append("TechnologyId", course.technologyId)
    formData.append("Description", course.Description)
    formData.append("FullDescription", course.Fulldescription)
    formData.append("WhatLearn", course.Whatlearn)
    formData.append("Requirements", course.requirements)
    formData.append("Title", course.Title)
    formData.append("Price", course.price)
    formData.append("IsOffer", (this.isofferactive).toString())
    formData.append("OfferPrice", this.OfferPrice)
    formData.append("TaxPercent", course.taxpercent)
    formData.append("CourseHeader", course.courseheader)
    formData.append("CourseUrl", course.courseurl)
    formData.append("MetaDescription", course.metadiscription)

    // formData.append("keywords",JSON.stringify(this.keywords))
    formData.append("metakeywords", course.metakeywords)
    formData.append("Status", this.status.toString())
    // formData.append("EffectiveFrom", (course.effectiveFrom.format("DD-MM-YYYY")))
    formData.append("EffectiveFrom", (course.effectiveFrom.format("DD-MM-YYYY")))
    formData.append("EffectiveTill", (course.effectiveTill.format("DD-MM-YYYY")))
    formData.append("showOnWebsite", (this.showonwebsite).toString())
    
    if (this.files.length == 1) {
      formData.append("fileupload", this.fileToUpload, this.name);
    }
    // console.log('formdata',formData)
    // var data = {
    // CourseName: course.courseName,
    // TechnologyId:course.technologyId,
    // Description: course.Description,
    // Title: course.Title,
    //  CreatedBy: parseInt(localStorage.getItem("LoginId")),
    //  IsActive: this.active,
    //  }
    this._authService.Addcourse(formData).subscribe((result: any) => {
      debugger
      //var result = JSON.parse(result);
      if (result.status == "200") {
        //debugger
        // Set the alert
        this.alert = {
          type: 'success',
          message: result.message
        };

        // Show the alert
        this.showAlert = true;
        setTimeout(() => {
          this._router.navigate(['/courses/course']);
        }, 1000);
      }
      else if (result.status == "-101") {
        //debugger
        // Set the alert
        this.alert = {
          type: 'error',
          message: result.message
        };

        // Show the alert
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 1000);
      }
      else {
        // Set the alert
        this.alert = {
          type: 'error',
          message: result.message
        };

        // Show the alert
        this.showAlert = true;
      }
      (error) => {

      }
    });
  }
  // toggleCompleted($event: MatSlideToggleChange): void {
  //   //debugger
  //   if ($event.checked != undefined) {
  //     this.active = $event.checked;
  //   }
  //   else {
  //     this.active = true;
  //   }
  //   //this.active=this.filters.hideCompleted$.next(change.checked);
  // }

}
