import { I } from '@angular/cdk/keycodes';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
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
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import moment from 'moment';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

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
  @BlockUI() blockUI: NgBlockUI;
  ImageAlt=' '
  VideoAlt=' '
  CourseImageAlt=' '
  selectedProduct: any | null = null;
  displayedColumns = ['sno','price', 'offerprice','effectivefrom','effectivetill'];
  dataSource: MatTableDataSource<coursefeeinactiveData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  active: boolean;

  courseForm: FormGroup;
  secondFormGroup: FormGroup;

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
  IconUrl: any;

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
  status: boolean;
  courseid: any;
  istax: boolean;

  fileToUpload1: File;
  name1: any;
  oldprice: any;
  files1: Array<any> = new Array<any>();
  files2: Array<any> = new Array<any>();
  fileToUpload2: File;
  name2: string;
  VideoUrl: any;
  videoSource: any=[];
  RelatedcourseIds: any;
  bind: any;
  courses: any;
  faculties: any;
  videoUrl: string=null;
  uploadvideo:boolean=true
  deletevideo:boolean=false
  IconImageAlt: any;
  istaxed: any;
  closevideo:boolean=true;
  UpdatedBy:any;
  CourseId:any;
  showAlert1: boolean;
  
  constructor(

    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,
    public datepipe: DatePipe,
    private _fuseConfirmationService: FuseConfirmationService,

  ) { }

  ngOnInit(): void {
    debugger;
    var loginId = localStorage.getItem("LoginId");
    var id = this.approute.snapshot.params['id'];
    var value = this.approute.snapshot.params['value'];

    this.GetTechnologys();
    this.GetCourses();
    this.GetFaculty();
    this.CourseId;


    this.courseForm = this._formBuilder.group({
      courseName: ['', [Validators.required]],
      technologyId: ['', []],
      description: ['', []],
      title: ['', []],
      fullDescription: ['', []],
      whatLearn: ['', []],
      requirements: ['', []],
      imageURL: ['', []],
      iconUrl: ['', []],
      videoUrl: ['', []],
      price: ['0', [Validators.required]],
      isOffer: [''],
      offerPrice: ['0'],
      //taxApplicable:[''],
      istax:[''],
      taxPercent:['0'],
      effectiveFrom: ['', Validators.required],
      effectiveTill: ['',],
      id: [''],
      showOnWebsite: [''],
      courseHeader: ['', []],
      courseUrl:['', []],
      metaDescription: ['', []],
      metaKeywords:['', []],
      stauts:[''],
      certifications:[''],
      imageTitle:[''],
      imageCaption:[''],
      imageShortDescription:[''],
      videoCaption:[''],
      facultyId:['',[Validators.required]],
      img:[''],
    });
    const ctrl = this.courseForm.controls['offerPrice'];
    ctrl.disable();
    const ctrl1 = this.courseForm.controls['taxPercent']
    ctrl1.disable();
    this.Edit(id, value);
    this.GetFeeInactiveData(id);
  }
  cancel() {
    this._router.navigate(['/courses/course']);
 
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
  onSelectFile1(files: FileList) {
    //debugger
    if (files.length === 0)
      return;
    if (files.length > 0) {
      this.files1 = [];
      for (var i = 0; i < files.length; i++) {
        this.fileToUpload1 = files.item(i);
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(this.fileToUpload1);
        this.name1 = this.fileToUpload1.name.split(' ').join('-').replace(/[()]/g, "")
        this.files1.push({ data: this.fileToUpload1, fileName: this.name1 });
      }
    }
  }



  onSelectVideo(files: FileList) {
    //debugger
    if (files.length === 0)
      return;
    if (files.length > 0) {
      this.files2 = [];
      for (var i = 0; i < files.length; i++) {
        this.fileToUpload2 = files.item(i);
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(this.fileToUpload2);
        this.name2 = this.fileToUpload2.name.split(' ').join('-').replace(/[()]/g, "")
        this.files2.push({ data: this.fileToUpload2, fileName: this.name2 });
      }
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

  GetCourses(){
    debugger
    this._authService.GetCourses().subscribe((finalresult: any) => {
      debugger
     this.courses = JSON.parse(finalresult);
     this.courses=this.courses.result
    })
  }

  GetFaculty(){

    this._authService.GetFaculties().subscribe((finalresult: any) => {
      // this.FacultySearch=finalresult.result;
      // this.filteredfaculties.next(this.FacultySearch.slice());

       
        // this.courseForm.patchValue(this.faculties);
        if (finalresult.status == "200") {
          this.faculties = finalresult.result;
        }
    })
}

DeleteVideo(){
  debugger

  var filename=this.videoUrl.replace('https://ugetit.blob.core.windows.net/coursevideos/',"")
 var data = {
     // MaterialId: row.materialId,
     VideoFileName: filename,
      CourseId:parseInt( this.Id),
      UpdatedBy: parseInt(localStorage.getItem("LoginId")),
      FolderName: 'coursevideos'
    }
  const confirmation = this._fuseConfirmationService.open({
    title  : 'Delete Uploaded Video',
    message: 'Are you sure you want to delete this course?',
    actions: {
        confirm: {
            label: 'Delete'
        }
    }
});

// Subscribe to the confirmation dialog closed action
confirmation.afterClosed().subscribe((result) => {

    // If the confirm button pressed...
    if ( result === 'confirmed' )
    {
      debugger
  this.closevideo=false        // Delete the video
        this._authService.DeleteVideo(data).subscribe((finalresult: any) => {
          debugger
          if(finalresult.status=="200"){
            this.uploadvideo=true
            this.deletevideo=false
            this.videoUrl=null
            this.name2=''
            this.files2=[]
            this.fileToUpload=null
            this.alert = {
              type: 'success',
              message:finalresult.message
            };
    
            // Show the alert
            this.showAlert1 = true;
  
            setTimeout(() => {
              this.showAlert1 = false;
              
            }, 3000);
          }
      })

              }
});
   
}

UploadVideo(value:any){
  debugger
  const formData: FormData = new FormData();
  if (this.files2.length >= 1) {
    formData.append("files", this.fileToUpload2, this.name2);
    this.blockUI.start('Uploading...');
    this._authService.UploadVideo(formData).subscribe((finalresult: any) => {
      debugger
      if(finalresult.status=="200"){
        this.uploadvideo=false
        this.deletevideo=true
        this.videoUrl=finalresult.result
        this.Updatecourse(value);
      }
  })
  }
  else {
    if(!this.courseForm.dirty){
      if(JSON.stringify(this.RelatedcourseIds)===JSON.stringify(this.bind))
      {
        this._router.navigate(['/courses/addcoursemodule/'+this.courseid]);
      }
      else{
        this.Updatecourse(value);
      }
    }
    else{
    this.Updatecourse(value);
    }
  }
}


  GoToFaq(){
    this._router.navigate(['/courses/questions/'+this.courseid]);
  }
  GoToReviews(){
    this._router.navigate(['/courses/reviews/'+this.courseid]);

  }
  GoToSubscriptions(){
    this._router.navigate(['/courses/subscriptions/'+this.courseid]);

  }
  GoToPage(){
    this._router.navigate(['/courses/addcoursemodule/'+this.courseid]);

  }
  GoToChapters(){
    var value="edit"
    this._router.navigate(['/courses/addcoursecontent/'+this.courseid+'/'+value]);
  }

  selectionChange(event: StepperSelectionEvent) {
    debugger
    var value="edit"
    console.log(event.selectedStep.label);
    let stepLabel = event.selectedStep.label
    if (stepLabel == "Step 2") {
      this._router.navigate(['/courses/addcoursemodule/'+this.courseid]);
    }
    if (stepLabel == "Step 3") {
      this._router.navigate(['/courses/addcoursecontent/'+this.courseid+'/'+value]);
    }
    if (stepLabel == "Step 4") {
      this._router.navigate(['/courses/questions/'+this.courseid]);
    }
    if (stepLabel == "Step 5") {
      this._router.navigate(['/courses/reviews/'+this.courseid]);
    }
    if (stepLabel == "Step 6") {
      this._router.navigate(['/courses/subscriptions/'+this.courseid]);
    }
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
      debugger
      // this.editsite=false;
      this.butdisabled = true;
      this.courseForm.controls['courseName'].disable();
      this.courseForm.controls['technologyId'].disable();
      this.courseForm.controls['description'].disable();
      this.courseForm.controls['title'].disable();
      this.courseForm.controls['fullDescription'].disable();
      this.courseForm.controls['whatLearn'].disable();
      this.courseForm.controls['requirements'].disable();
      this.courseForm.controls['isOffer'].disable();
      this.courseForm.controls['offerPrice'].disable();
      this.courseForm.controls['price'].disable();
      this.courseForm.controls['taxPercent'].disable();
      this.courseForm.controls['courseHeader'].disable();
      this.courseForm.controls['courseUrl'].disable();
      this.courseForm.controls['metaDescription'].disable();
      this.courseForm.controls['metaKeywords'].disable();
      this.courseForm.controls['showOnWebsite'].disable();
      this.courseForm.controls['imageTitle'].disable();
      this.courseForm.controls['imageCaption'].disable();
      this.courseForm.controls['imageShortDescription'].disable();
      this.courseForm.controls['videoCaption'].disable();
       this.courseForm.controls['certifications'].disable();
      this.courseForm.controls['effectiveFrom'].disable();
      this.courseForm.controls['effectiveTill'].disable();
      this.courseForm.controls['showOnWebsite'].disable();
      this.courseForm.controls['facultyId'].disable();
      this.courseForm.controls['img'].disable();

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
      this.courseForm.controls['taxPercent'].enable();

      this.courseForm.controls['isOffer'].enable();
      // this.courseForm.controls['offerPrice'].enable();
      this.courseForm.controls['effectiveFrom'].enable();
      this.courseForm.controls['effectiveTill'].enable();
      this.courseForm.controls['showOnWebsite'].enable();
      this.courseForm.controls['img'].enable();

    }
    this.Id = id;
    this._authService.GetcourseById(this.Id).subscribe((finalresult: any) => {
      debugger
      console.log(finalresult);
      //  var finalresult = JSON.parse(result);
      // rolebyid=finalresult;
      if (finalresult.status == "200") {
        debugger

      //   if(this.courseForm.controls['isOffer'].value==true)
      //   {
      //  this.courseForm.controls['taxPercent'].enable();
      //   }
      //   this.courseForm.controls['istax'].setValue(true);

if(finalresult.result.taxPercent!=0){
  
  this.courseForm.controls['istax'].setValue(true);
  
  
}
else{
  this.courseForm.controls['istax'].setValue(false);
  const ctrl = this.courseForm.controls['taxPercent'];
  ctrl.disable();
  ctrl.setValue('0')

}
        this.courseForm.patchValue(finalresult.result);
        this.status=finalresult.result.status
        const course = this.courseForm.getRawValue();
        this.courseid=finalresult.result.courseId
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
        this.oldprice=course.price
        this.RelatedcourseIds=finalresult.result.relCourses;
        this.bind=this.RelatedcourseIds.map(item => item.relatedCourseId)
        .filter((value, index, self) => self.indexOf(value) === index);
        this.RelatedcourseIds=this.bind
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
          this.ImageURL =  finalresult.result.imageURL;
          // this.noimage=true;;

        }
        else {
          // this.ImageURL = baseurl + "/courseFiles/dummy identityproof.png";
          this.CourseImageAlt='Course Image Is Not Uploaded'
        }
        if (finalresult.result.iconUrl != null) {
          this.IconUrl =  finalresult.result.iconUrl;
          // this.noimage=true;;

        }
        else{
          this.IconImageAlt='Icon Is Not Uploaded'
        }
        if (finalresult.result.videoUrl != null) {
          this.videoSource.push( finalresult.result.videoUrl);
          this.videoUrl=finalresult.result.videoUrl
          this.name2=finalresult.result.VideoFileName
          this.uploadvideo=false
          this.deletevideo=true
          // this.noimage=true;
        }
        else{
          this.ImageAlt='Video Is Not Uploaded'
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

  check($event: MatSlideToggleChange): void {
    debugger
    if ($event.checked != undefined) {
      this.istax = $event.checked;
      if (this.istax == true) {
        const ctrl = this.courseForm.controls['taxPercent'];
        ctrl.enable();
      }
      else {
        const ctrl = this.courseForm.controls['taxPercent'];
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
  Updatecourse(val:any) {
    debugger

    this.showAlert = false;
    if (this.courseForm.invalid) {
      return;
    }

    var finalids=[] 
    if(this.RelatedcourseIds.length==this.bind.length){
      for(let i=0;i<this.bind.length;i++){
        if(this.RelatedcourseIds[i]!=this.bind[i]){
        finalids.push(this.bind[i])
        }
      }
    }
    else{
      finalids.push(1);
    }

    // Get the contact object
    const course = this.courseForm.getRawValue();
    if(this.oldprice!=course.price){
    course.effectiveTill=(moment(new Date()).format("DD-MM-YYYY"));
    }
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
    // if(this.effectivefrm!=course.effectiveFrom)
    // {
    //   course.effectiveFrom=(course.effectiveFrom).format("DD-MM-YYYY")
    // }
    // if(this.effectivetil!=course.effectiveTill)
    // {
    //   course.effectiveTill=(course.effectiveTill).format("DD-MM-YYYY")
    // }
    if(course.showOnWebsite!=undefined){
      this.showonwebsite =course.showOnWebsite;
    }
    
    var ListOfCourse = [];
    for (var i = 0; i < this.bind.length; i++) {
      if (this.bind[i] != "") {
        // const courselist = new list();
        // courselist.CourseId = this.bind[i];
        ListOfCourse.push(this.bind[i]);
      }
    }


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
    formData.append("TaxPercent", course.taxPercent)
    formData.append("CourseHeader", course.courseHeader)
    formData.append("CourseUrl", course.courseUrl)
    formData.append("Status", this.status.toString())
    formData.append("MetaDescription", course.metaDescription)
    formData.append("metaKeywords", course.metaKeywords)
    formData.append("Certifications", course.certifications)
    formData.append("ImageTitle", course.imageTitle)
    formData.append("ImageCaption", course.imageCaption)
    formData.append("ImageShortDescription", course.imageShortDescription)
    formData.append("VideoCaption", course.videoCaption)
    formData.append("EffectiveFrom", (course.effectiveFrom))
    formData.append("EffectiveTill", (course.effectiveTill))
    formData.append("showOnWebsite", (this.showonwebsite).toString())
    formData.append("RelatedCourses", JSON.stringify(ListOfCourse))
    formData.append("FinalIds", JSON.stringify(finalids))
    formData.append("FacultyId", course.facultyId)
    formData.append("VideoUrl", this.videoUrl)
    formData.append("VideoFileName", this.name2)

    if (this.files.length == 1) {
      formData.append("fileupload", this.fileToUpload, this.name);
    }
    else {
      formData.append("imageURL", course.imageURL);

    }
    if (this.files1.length == 1) {
      formData.append("fileupload1", this.fileToUpload1, this.name1);
    }
    else {
      formData.append("iconUrl", course.iconUrl);

    }
    // if (this.files2.length == 1) {
    //   formData.append("fileupload2", this.fileToUpload2, this.name2);
    // }
    // else {
    //   formData.append("VideoUrl", course.videoUrl);

   
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
        if(val=='update'){
          setTimeout(() => {
            this.blockUI.stop();
            window.location.reload();
            // this._router.navigate(['/courses/course']);
          }, 3000);
        }
        else if (val == 'updatenext') {
          setTimeout(() => {
            this.blockUI.stop();
            this._router.navigate(['/courses/addcoursemodule/'+this.courseid]);
          }, 3000);
        }
       
        
      }
      else {
        // Set the alert
        this.alert = {
          type: 'error',
          message: result.message
        };

        // Show the alert
        this.showAlert = true;
        setTimeout(() => {
          this.blockUI.stop();
          this.showAlert = false;
        }, 3000);

      }
      (error) => {
        this.blockUI.stop();
      }
    });
  }

  UpdateNext() {
    debugger
    this.showAlert = false;
    if (this.courseForm.invalid) {
      return;
    }

    var finalids=[] 
    if(this.RelatedcourseIds.length==this.bind.length){
      for(let i=0;i<this.bind.length;i++){
        if(this.RelatedcourseIds[i]!=this.bind[i]){
        finalids.push(this.bind[i])
        }
      }
    }
    else{
      finalids.push(1);
    }

    // Get the contact object
    const course = this.courseForm.getRawValue();
    if(this.oldprice!=course.price){
    course.effectiveTill=(moment(new Date()).format("DD-MM-YYYY"));
    }
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
    // if(this.effectivefrm!=course.effectiveFrom)
    // {
    //   course.effectiveFrom=(course.effectiveFrom).format("DD-MM-YYYY")
    // }
    // if(this.effectivetil!=course.effectiveTill)
    // {
    //   course.effectiveTill=(course.effectiveTill).format("DD-MM-YYYY")
    // }
    if(course.showOnWebsite!=undefined){
      this.showonwebsite =course.showOnWebsite;
    }
    
    var ListOfCourse = [];
    for (var i = 0; i < this.bind.length; i++) {
      if (this.bind[i] != "") {
        // const courselist = new list();
        // courselist.CourseId = this.bind[i];
        ListOfCourse.push(this.bind[i]);
      }
    }


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
    formData.append("TaxPercent", course.taxPercent)
    formData.append("CourseHeader", course.courseHeader)
    formData.append("CourseUrl", course.courseUrl)
    formData.append("Status", this.status.toString())
    formData.append("MetaDescription", course.metaDescription)
    formData.append("metaKeywords", course.metaKeywords)
    formData.append("Certifications", course.certifications)
    formData.append("ImageTitle", course.imageTitle)
    formData.append("ImageCaption", course.imageCaption)
    formData.append("ImageShortDescription", course.imageShortDescription)
    formData.append("VideoCaption", course.videoCaption)
    formData.append("EffectiveFrom", (course.effectiveFrom))
    formData.append("EffectiveTill", (course.effectiveTill))
    formData.append("showOnWebsite", (this.showonwebsite).toString())
    formData.append("RelatedCourses", JSON.stringify(ListOfCourse))
    formData.append("FinalIds", JSON.stringify(finalids))
    formData.append("FacultyId", course.facultyId)
    formData.append("VideoUrl", this.videoUrl)
    formData.append("VideoFileName", this.name2)

    if (this.files.length == 1) {
      formData.append("fileupload", this.fileToUpload, this.name);
    }
    else {
      formData.append("imageURL", course.imageURL);

    }
    if (this.files1.length == 1) {
      formData.append("fileupload1", this.fileToUpload1, this.name1);
    }
    else {
      formData.append("iconUrl", course.iconUrl);

    }
    // if (this.files2.length == 1) {
    //   formData.append("fileupload2", this.fileToUpload2, this.name2);
    // }
    // else {
    //   formData.append("VideoUrl", course.videoUrl);

   
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
          this._router.navigate(['/courses/addcoursemodule/'+this.courseid]);
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

}
