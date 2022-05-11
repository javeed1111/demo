import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
export interface coursefeeinactiveData {
  sno: number;
  price: string;
  offerprice: string;
  effectivefrom: string;
  effectivetill: string;
}
@Component({
  selector: 'app-editcourse',
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditcourseComponent implements OnInit {
  selectedProduct: any | null = null;
  displayedColumns = ['sno','price', 'offerprice','effectivefrom','effectivetill'];
  dataSource: MatTableDataSource<coursefeeinactiveData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  active: boolean;
  courseForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;
  Id: any;
  userId: any;
  isActive: boolean;
  showonwebsite: boolean; 
  technology: any;
  files: Array<any> = new Array<any>();
  fileToUpload: File = null;
  name: string;
  profileImage: any;
  ImageURL: any;
  butdisabled: boolean = false;
  todayDate = new Date();
  isofferactive: boolean;
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
  offerpricenbind: any;
  OfferPrice: string;
  isoffer: any;
  effectivefrm: any;
  effectivetil: any;
  feedetailsid: any;

  constructor(

    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,
    public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    //debugger;
    var loginId = localStorage.getItem("LoginId");
    var id = this.approute.snapshot.params['id'];
    var value = this.approute.snapshot.params['value'];

    this.GetTechnologys();


    this.courseForm = this._formBuilder.group({
      courseName: ['', [Validators.required]],
      technologyId: ['', []],
      description: ['', []],
      title: ['', []],
      fullDescription: ['', []],
      whatLearn: ['', []],
      requirements: ['', []],
      imageURL: ['', []],
      price: ['0', [Validators.required]],
      isOffer: [''],
      offerPrice: ['0'],
      effectiveFrom: ['', Validators.required],
      effectiveTill: ['', Validators.required],
      id: [''],
      showOnWebsite: ['']

    });
    const ctrl = this.courseForm.controls['offerPrice'];
    ctrl.disable();
    this.Edit(id, value);
    this.GetFeeInactiveData(id);
  }
  cancel() {
    this._router.navigate(['/courses/course']);
    setTimeout(() => {
      window.location.reload();
    }, 10);
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
        if(this.offerpricenbind!=0){
          ctrl.setValue(this.offerpricenbind)
        }
        else{
          ctrl.setValue('0')
        }
      }
      else {
        const ctrl = this.courseForm.controls['offerPrice'];
        ctrl.disable();
        ctrl.setValue('0')
        // if(this.offerpricenbind!=0){
        //   ctrl.setValue(this.offerpricenbind)
        // }
        // else{
        //   ctrl.setValue('0')
        // }

      }

    }
    else {
      this.isofferactive = false;
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
        if(this.courseForm.controls['isOffer'].value==true)
        {
       this.courseForm.controls['offerPrice'].enable();
        }
        //this.roles = finalresult.result;
        console.log('techs', this.technology)
        //const dataSource = this.roles ;
      }
      else {

      }
    });
  }
  Edit(id: any, value: any) {
    //debugger
    var baseurl = this._authService.baseUrl;
    if (baseurl == "https://localhost:44358/") {
      baseurl = "https://localhost:44358"
    }
    if (baseurl == "http://testugetitapi.fadelsoft.com/") {
      baseurl = "http://testugetitapi.fadelsoft.com"
    }
    if (value == "view") {
      // this.editsite=false;
      this.butdisabled = true;
      this.courseForm.controls['courseName'].disable();
      this.courseForm.controls['technologyId'].disable();
      this.courseForm.controls['description'].disable();
      this.courseForm.controls['title'].disable();
      this.courseForm.controls['fullDescription'].disable();
      this.courseForm.controls['whatLearn'].disable();
      this.courseForm.controls['requirements'].disable();
      this.courseForm.controls['price'].disable();
      this.courseForm.controls['isOffer'].disable();
      // this.courseForm.controls['offerPrice'].disable();
      this.courseForm.controls['effectiveFrom'].disable();
      this.courseForm.controls['effectiveTill'].disable();
      this.courseForm.controls['showOnWebsite'].disable();



    }
    else {
      this.butdisabled = false;
      this.courseForm.controls['courseName'].enable();
      this.courseForm.controls['technologyId'].enable();
      this.courseForm.controls['description'].enable();
      this.courseForm.controls['title'].enable();
      this.courseForm.controls['fullDescription'].enable();
      this.courseForm.controls['whatLearn'].enable();
      this.courseForm.controls['requirements'].enable();
      this.courseForm.controls['price'].enable();
      this.courseForm.controls['isOffer'].enable();
      // this.courseForm.controls['offerPrice'].enable();
      this.courseForm.controls['effectiveFrom'].enable();
      this.courseForm.controls['effectiveTill'].enable();
      this.courseForm.controls['showOnWebsite'].enable();
      

    }
    this.Id = id;
    this._authService.GetcourseById(this.Id).subscribe((finalresult: any) => {
      debugger
      console.log(finalresult);
      //  var finalresult = JSON.parse(result);
      // rolebyid=finalresult;
      if (finalresult.status == "200") {
        debugger

        this.courseForm.patchValue(finalresult.result);
        const course = this.courseForm.getRawValue();
        // if (course.duration == 0) {
        //   this.courseForm.controls['duration'].setValue("")
        // }
        // if (course.fees == 0) {
        //   this.courseForm.controls['fees'].setValue("")
        // }"0001-01-01T00:00:00"
        this.feedetailsid= course.id;
        this.isoffer  = course.isOffer;
        this.effectivefrm  = course.effectiveFrom;
        this.effectivetil  = course.effectiveTill;
        // if(course.effectiveFrom=="0001-01-01T00:00:00"){
        //   course.effectiveFrom="effectiveFrom"
        // }
        // if(course.effectiveTill=="0001-01-01T00:00:00"){
        //   course.effectiveTill="effectiveTill"
        // }
        this.offerpricenbind =this.courseForm.controls['offerPrice'].value;
        if(this.courseForm.controls['isOffer'].value==true && value == "edit")
        {
       this.courseForm.controls['offerPrice'].enable();
        }
        if (finalresult.result.imageURL != null) {
          this.ImageURL = baseurl + finalresult.result.imageURL;
          // this.noimage=true;;

        }
        else {
          // this.ImageURL = baseurl + "/courseFiles/dummy identityproof.png";

        }

        // if (finalresult.result.isActive == true) {
        //     var check = document.getElementById("userchkactive") as HTMLInputElement;
        //     check.checked = true;
        // }
        // else {
        //     var check = document.getElementById("userchkactive") as HTMLInputElement;
        //     check.checked = false;
        // }
        //  this.spinner.hide();
      }
      else {
        this.alert = {
          type: 'error',
          message: finalresult.message
        };

        // Show the alert
        this.showAlert = true;
        setTimeout(() => {
          // window.location.reload();
        this.showAlert = false;

          // this._router.navigate(['/courses/course']);
        }, 1000);

      }
    });
  }
  GetFeeInactiveData(id:any){
    this.Id = id;
    this._authService.GetallcoursefeeById(this.Id).subscribe((finalresult: any) => {
      debugger
      console.log(finalresult);
      //  var finalresult = JSON.parse(result);
      // rolebyid=finalresult;
      if (finalresult.status == "200") {
        debugger
        for(let i=0;i<finalresult.result.length;i++){
          finalresult.result[i].effectiveFrom=this.datepipe.transform(finalresult.result[i].effectiveFrom, 'dd-MM-yyyy');
          finalresult.result[i].effectiveTill=this.datepipe.transform(finalresult.result[i].effectiveTill, 'dd-MM-yyyy');
            
          }
        this.dataSource = new MatTableDataSource(finalresult.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      }
      else {
        

      }
    });
    
   
  }
  Updatecourse() {
    debugger
    this.showAlert = false;
    if (this.courseForm.invalid) {
      return;
    }

    // Get the contact object
    const course = this.courseForm.getRawValue();
    if (this.isofferactive == undefined) {
      if(this.isoffer==false && this.isofferactive == undefined){
        this.OfferPrice = '0';
        this.isofferactive = false;
      }
      else if(this.isoffer==false){
        this.OfferPrice = '0';
      }
      else{
        this.isofferactive = this.isoffer;
      // this.horizontalStepperForm.controls['offerPrice'].disable();
      
      this.OfferPrice = course.offerPrice;
      } 
    }
    else {
      // this.horizontalStepperForm.controls['offerPrice'].enable();
      this.OfferPrice = course.offerPrice;
    }
    if(this.effectivefrm!=course.effectiveFrom)
    {
      course.effectiveFrom=(course.effectiveFrom).format("DD-MM-YYYY")
    }
    if(this.effectivetil!=course.effectiveTill)
    {
      course.effectiveTill=(course.effectiveTill).format("DD-MM-YYYY")
    }
    if(course.showOnWebsite!=undefined){
      this.showonwebsite =course.showOnWebsite;
    }
    
    

    // Go through the contact object and clear empty values
    //  contact.emails = contact.emails.filter(email => email.email);

    //  contact.phoneNumbers = contact.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

    // if (course.isActive == undefined) {
    //   course.isActive = true;
    // }
    // if (course.duration == "") {
    //   course.duration = 0
    //   // this.courseForm.controls['Duration'].setValue(0)
    // }
    // if (course.fees == "") {
    //   course.fees = 0
    //   // this.courseForm.controls['Fees'].setValue(0)
    //   // course.fees="";
    // }
    const formData: FormData = new FormData();
    formData.append("CourseName", course.courseName)
    formData.append("TechnologyId", course.technologyId)
    formData.append("UpdatedBy", (localStorage.getItem("LoginId")));
    formData.append("Description", course.description)
    formData.append("FullDescription", course.fullDescription)
    formData.append("WhatLearn", course.whatLearn)
    formData.append("Requirements", course.requirements)
    formData.append("Title", course.title)
    formData.append("CourseId", this.approute.snapshot.params['id'])
    formData.append("Id", this.feedetailsid)
    formData.append("Price", course.price)
    formData.append("IsOffer", (this.isofferactive).toString())
    formData.append("OfferPrice", this.OfferPrice)
    formData.append("EffectiveFrom", (course.effectiveFrom))
    formData.append("EffectiveTill", (course.effectiveTill))
    formData.append("showOnWebsite", (this.showonwebsite).toString())

    if (this.files.length == 1) {
      formData.append("fileupload", this.fileToUpload, this.name);
    }
    else {
      formData.append("imageURL", course.imageURL);

    }
    // var data = {
    //   CourseName: course.courseName,
    //   Description: course.description,
    //   Title: course.title,
    //   UpdatedBy: parseInt(localStorage.getItem("LoginId")),
    //   //  IsActive: tech.isActive,
    //   CourseId: this.approute.snapshot.params['id'],
    // }
    this._authService.UpdateCourse(formData).subscribe((result: any) => {

      //debugger
      var result = JSON.parse(result);
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
          window.location.reload();
          // this._router.navigate(['/courses/course']);
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
//   toggleCompleted($event: MatSlideToggleChange): void {
//     //debugger
//     if ($event.checked != undefined) {
//       this.isActive = $event.checked;
//     }
//     else {
//       this.isActive = true;
//     }
//     //this.active=this.filters.hideCompleted$.next(change.checked);
//   }

}
