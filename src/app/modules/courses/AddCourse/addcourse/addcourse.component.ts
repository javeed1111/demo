import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { MatInputModule } from '@angular/material/input'
import { fuseAnimations } from '@fuse/animations';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER, I, SPACE } from '@angular/cdk/keycodes';
import moment from 'moment';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { take } from 'rxjs/operators';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MatPaginator } from '@angular/material/paginator';

export interface Keywords {
  name: string;
}

interface facultysearch {
  id: string;
  firstName: string;
}

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddcourseComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  uploadvideo: boolean = true
  deletevideo: boolean = false
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  keywords: Keywords[] = [];

  active: boolean;
  courseForm: FormGroup;
  secondFormGroup: FormGroup;
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
  status: boolean = true;
  fileToUpload1: File;
  name1: string;
  files1: Array<any> = new Array<any>();
  uploadedvideofile: any;
  removeupload: boolean = false;
  uploadedfilename: string;
  files2: Array<any> = new Array<any>();
  fileToUpload2: File;
  name2: string;
  courses: any;
  courses1: any;
  public instructor: FormControl = new FormControl();
  public instructorfilterctrl: FormControl = new FormControl();
  public filteredfaculties: ReplaySubject<any> = new ReplaySubject(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject();
  protected FacultySearch: facultysearch[] = [

  ];
  faculties: any;
  videoUrl: string = null;
  startingNumber: any;
  

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _fuseConfirmationService: FuseConfirmationService,

  ) { }

  ngOnInit(): void {


   this.GetstartingNumber();
    this.GetTechnologys();
    this.GetCourses();
    this.GetFaculty();
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.courseForm = this._formBuilder.group({
      startingNumber:['',[]],
      courseName: ['', [Validators.required]],
      technologyId: ['', []],
      Description: ['', []],
      Title: ['', []],
      Fulldescription: ['', []],
      Whatlearn: ['', []],
      requirements: ['', []],
      price: ['0', [Validators.required]],
      DollarPrice:['0', []],
      
      offerApplicable: [''],
      onwebsite: [''],
      offerPrice: ['0'],
      taxpercent: ['0'],
     effectiveFrom: [''],
      effectiveTill: [''],
      courseheader: ['', []],
      courseurl: ['', []],
      metadiscription: ['', []],
      metakeywords: ['', []],
      certifications: [''],
      imagetitle: [''],
      imagecaption: [''],
      imageshortdescription: [''],
      videocaption: [''],
      uploader1: ['', ],
      relatedcourses: [''],

      // UploadCourseIcon: ['', [Validators.required]],
      //  UploadCourseVideo:['',[Validators.required]],
      // UploadImage: ['', [Validators.required]],

      instructor: ['', [Validators.required]]
    });
    // var currentdate=new Date()

    this.courseForm.controls['effectiveFrom'].setValue(new Date());
    const ctrl = this.courseForm.controls['offerPrice']
    ctrl.disable();
    const ctrl1 = this.courseForm.controls['taxpercent']
    ctrl1.disable();

    this.instructorfilterctrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.filterBanks1();

    });
   
  }

  ngOnDestroy() {
    this._onDestroy.next(10);
    this._onDestroy.complete();
  }
  // UploadVideo(){
  //   
  //   const formData: FormData = new FormData();
  //   if (this.files2.length == 1) {
  //     formData.append("files", this.fileToUpload2, this.name2);
  //     this._authService.UploadVideo(formData).subscribe((finalresult: any) => {
  //       
  //       if(finalresult.status=="200"){
  //         this.uploadvideo=false
  //         this.deletevideo=true
  //         this.videoUrl=finalresult.result
  //         this.alert = {
  //           type: 'success',
  //           message:finalresult.message
  //         };

  //         // Show the alert
  //         this.showAlert = true;

  //         setTimeout(() => {
  //           this.showAlert = false;

  //         }, 3000);
  //       }
  //   })
  //   }
  // }


  UploadVideo(value: any) {
    
     
    if (this.files.length == 0 || this.files1.length == 0 || this.files2.length == 0) {
      this.showAlert = true;
      if(this.files.length == 0){
        var showmessage="Selecting Course Image Mandatory"
      }
      else if(this.files1.length == 0){
        var showmessage="Selecting Course Icon Mandatory"
      }
      else{
        var showmessage="Selecting  Video Mandatory"
      }
     this.alert = {
       type: 'warning',
       message: showmessage
     };
    
     setTimeout(() => {
       this.showAlert = false;
       return;
     }, 1500);
   }

   if (this.courseForm.invalid) {
    
     return;
   }

    const formData: FormData = new FormData();
    if (this.files2!=undefined && this.files2.length >= 1 ) {
      formData.append("files", this.fileToUpload2, this.name2);

      this.blockUI.start('Uploading...');

      this._authService.UploadVideo(formData)
        .subscribe((finalresult: any) => {
          
          this.uploadvideo = false
          this.deletevideo = true
          this.videoUrl = finalresult.result
          this.AddCourse(value);

        })
    }
    else {
      this.AddCourse(value);
    }


  }

  protected filterBanks1() {
    if (!this.FacultySearch) {
      return;
    }

    let search = this.instructorfilterctrl.value;
    if (!search) {
      this.filteredfaculties.next(this.FacultySearch.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredfaculties.next(
      this.FacultySearch.filter(bank => bank.firstName.toLowerCase().indexOf(search) > -1)
    );
  }



  protected setInitialValue1() {

    this.filteredfaculties
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: facultysearch, b: facultysearch) => a && b && a.id === b.id;
      });
  }

  GetFaculty() {

    this._authService.GetFaculties().subscribe((finalresult: any) => {
      this.FacultySearch = finalresult.result;
      this.filteredfaculties.next(this.FacultySearch.slice());

      this.faculties = finalresult.result;
      // this.courseForm.patchValue(this.faculties);
      if (finalresult.status == "200") {

      }
    })
  }

  ngAfterViewIntit() {
    this.filteredfaculties.next(this.FacultySearch.slice());

    this.instructorfilterctrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks1();
      });
    this.setInitialValue1();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.keywords.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  GetCourses() {
    
    this._authService.GetCourses().subscribe((finalresult: any) => {
      
      this.courses = JSON.parse(finalresult);
      this.courses = this.courses.result
    })
  }
  GetstartingNumber() {
    debugger
    this._authService.GetstartingNumber().subscribe((finalresult: any) => {
      debugger
      this.courses1 = JSON.parse(finalresult);

      this.courseForm.controls['startingNumber'].setValue(this.courses1.result[0].startingNumber)
      // this.courses1 = this.courses1.result
    })
  }


 

  removeuploads() {
    this.removeupload = true;
    this.uploadedvideofile = '';
    this.uploadedfilename = '';
  }

  remove(fruit: Keywords): void {
    
    const index = this.keywords.indexOf(fruit);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  Status($event: MatSlideToggleChange): void {
    
    if ($event.checked != undefined) {
      this.status = $event.checked;
    }
    else {
      this.status = $event.checked;

    }
  }

  SaveNext() {

    
    this.showAlert = false;
    if (this.courseForm.invalid) {
      return;
    }
    const course = this.courseForm.getRawValue();
    var efeectivetill = course.effectiveTill == "" ? null : course.effectiveTill.format("DD-MM-YYYY")

    if (this.isofferactive == undefined) {
      this.isofferactive = false;
      // this.horizontalStepperForm.controls['offerPrice'].disable();
      this.OfferPrice = '0'
    }
    else {
      // this.horizontalStepperForm.controls['offerPrice'].enable();
      this.OfferPrice = course.offerPrice;
    }
    if (this.showonwebsite == undefined) {
      this.showonwebsite = true
    }

    const formData: FormData = new FormData();
    formData.append("StartingNumber", course.startingNumber)
    formData.append("CourseName", course.courseName)
    formData.append("CreatedBy", (localStorage.getItem("LoginId")));
    formData.append("TechnologyId", course.technologyId)
    formData.append("Description", course.Description)
    formData.append("FullDescription", course.Fulldescription)
    formData.append("WhatLearn", course.Whatlearn)
    formData.append("Requirements", course.requirements)
    formData.append("Title", course.Title)
    formData.append("Price", course.price)
    formData.append("DollarPrice", course.DollarPrice)
    formData.append("IsOffer", (this.isofferactive).toString())
    formData.append("OfferPrice", this.OfferPrice)
    formData.append("TaxPercent", course.taxpercent)
    formData.append("CourseHeader", course.courseheader)
    formData.append("CourseUrl", course.courseurl)
    formData.append("MetaDescription", course.metadiscription)
    // formData.append("keywords",JSON.stringify(this.keywords))
    formData.append("metakeywords", course.metakeywords)
    formData.append("Certifications", course.certifications)
    formData.append("ImageTitle", course.imagetitle)
    formData.append("ImageCaption", course.imagecaption)
    formData.append("ImageShortDescription", course.imageshortdescription)
    formData.append("VideoCaption", course.videocaption)
    formData.append("Status", this.status.toString())
    // formData.append("EffectiveFrom", (course.effectiveFrom.format("DD-MM-YYYY")))
    formData.append("EffectiveFrom", (moment(course.effectiveFrom).format("DD-MM-YYYY")))
    formData.append("EffectiveTill", efeectivetill)
    formData.append("showOnWebsite", (this.showonwebsite).toString())
    formData.append("FacultyId", course.instructor.toString())
    formData.append("VideoUrl", this.videoUrl)
    formData.append("VideoFileName", this.name2)
    if (course.relatedcourses == "") {
      course.relatedcourses = []
      formData.append("RelatedCourses", JSON.stringify(course.relatedcourses))

    }
    else {
      formData.append("RelatedCourses", JSON.stringify(course.relatedcourses))
    }


    if (this.files.length == 1) {
      formData.append("fileupload", this.fileToUpload, this.name);
    }
    if (this.files1.length == 1) {
      formData.append("fileupload1", this.fileToUpload1, this.name1);
    }
    // if (this.files2.length == 1) {
    //   formData.append("fileupload2", this.fileToUpload2, this.name2);
    // }
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
      
      //var result = JSON.parse(result);
      if (result.status == "200") {
        //
        // Set the alert
        this.alert = {
          type: 'success',
          message: result.message
        };

        // Show the alert
        this.showAlert = true;
        setTimeout(() => {
          this._router.navigate(['/courses/addcoursemodule/' + result.result]);
        }, 1000);
      }
      else if (result.status == "-101") {
        //
        // Set the alert
        this.alert = {
          type: 'error',
          message: result.message
        };

        // Show the alert
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
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

  onSelectFile(files: FileList) {
    
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
    //
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
    //
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

  checkprice() {
    
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
    
    if ($event.checked == undefined || $event.checked == true) {
      this.showonwebsite = $event.checked;
    }
    else {
      this.showonwebsite = false;
      // this.isofferactive = false;
    }

  }
  GetTechnologys() {
    //
    this._authService.GetTechnologies().subscribe((finalresult: any) => {
      //
      var finalresult = JSON.parse(finalresult);
      if (finalresult.status == "200") {
        //
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

  DeleteVideo() {
    
    var filename = this.videoUrl.replace('https://ugetit.blob.core.windows.net/coursevideos/', "")

    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete Uploaded Video',
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
      if (result === 'confirmed') {

        // Delete the video
        this._authService.DeleteVideo(filename).subscribe((finalresult: any) => {
          
          if (finalresult.status == "200") {
            this.uploadvideo = true
            this.deletevideo = false
            this.videoUrl = null
            this.name2 = ''
            this.files2 = []
            this.fileToUpload = null
            this.alert = {
              type: 'success',
              message: finalresult.message
            };

            // Show the alert
            this.showAlert = true;

            setTimeout(() => {
              this.showAlert = false;

            }, 3000);
          }
        })

      }
    });

  }



  AddCourse(val: any) {
    
    this.showAlert = false;

    const course = this.courseForm.getRawValue();
    var efeectivetill = course.effectiveTill == "" ? null : course.effectiveTill.format("DD-MM-YYYY")

    if (this.isofferactive == undefined) {
      this.isofferactive = false;
      // this.horizontalStepperForm.controls['offerPrice'].disable();
      this.OfferPrice = '0'
    }
    else {
      // this.horizontalStepperForm.controls['offerPrice'].enable();
      this.OfferPrice = course.offerPrice;
    }
    if (this.showonwebsite == undefined) {
      this.showonwebsite = true
    }

    const formData: FormData = new FormData();
    // formData.append("CourseName", course.)
    formData.append("StartingNumber", course.startingNumber)
    formData.append("CourseName", course.courseName)
    formData.append("CreatedBy", (localStorage.getItem("LoginId")));
    formData.append("TechnologyId", course.technologyId)
    formData.append("Description", course.Description)
    formData.append("FullDescription", course.Fulldescription)
    formData.append("WhatLearn", course.Whatlearn)
    formData.append("Requirements", course.requirements)
    formData.append("Title", course.Title)
    formData.append("Price", course.price)
    formData.append("DollarPrice", course.DollarPrice)
    formData.append("IsOffer", (this.isofferactive).toString())
    formData.append("OfferPrice", this.OfferPrice)
    formData.append("TaxPercent", course.taxpercent)
    formData.append("CourseHeader", course.courseheader)
    formData.append("CourseUrl", course.courseurl)
    formData.append("MetaDescription", course.metadiscription)
    // formData.append("keywords",JSON.stringify(this.keywords))
    formData.append("metakeywords", course.metakeywords)
    formData.append("Certifications", course.certifications)
    formData.append("ImageTitle", course.imagetitle)
    formData.append("ImageCaption", course.imagecaption)
    formData.append("ImageShortDescription", course.imageshortdescription)
    formData.append("VideoCaption", course.videocaption)
    formData.append("Status", this.status.toString())
    // formData.append("EffectiveFrom", (course.effectiveFrom.format("DD-MM-YYYY")))
    formData.append("EffectiveFrom", (moment(course.effectiveFrom).format("DD-MM-YYYY")))
    formData.append("EffectiveTill", efeectivetill)
    formData.append("showOnWebsite", (this.showonwebsite).toString())
    formData.append("FacultyId", course.instructor.toString())
    formData.append("VideoUrl", this.videoUrl)
    formData.append("VideoFileName", this.name2)
   
      if (course.relatedcourses == "") {
        course.relatedcourses = []
        formData.append("RelatedCourses", JSON.stringify(course.relatedcourses))

      }
      else {
        formData.append("RelatedCourses", JSON.stringify(course.relatedcourses))
      }

      if (this.files.length == 1) {
        formData.append("fileupload", this.fileToUpload, this.name);
      }
      if (this.files1.length == 1) {
        formData.append("fileupload1", this.fileToUpload1, this.name1);
      }
      // if (this.files2.length == 1) {
      //   formData.append("fileupload2", this.fileToUpload2, this.name2);
      // }
      // console.log('formdata',formData)
      // var data = {
      // CourseName: course.courseName,
      // TechnologyId:course.technologyId,
      // Description: course.Description,
      // Title: course.Title,
      //  CreatedBy: parseInt(localStorage.getItem("LoginId")),
      //  IsActive: this.active,
      //  }
      this.blockUI.start('Saving..')
      this._authService.Addcourse(formData).subscribe((result: any) => {
        
        //var result = JSON.parse(result);
        if (result.status == "200") {
          //
          // Set the alert
          this.alert = {
            type: 'success',
            message: result.message
          };
debugger
          // Show the alert
          this.showAlert = true;
          if (val == 'save') {
            setTimeout(() => {
              this.blockUI.stop()
             
              
             // window.location.reload();
             this._router.navigate(['/courses/editcourse/'+result.result+'/edit'])
             
            }, 3000);
          }
          else if (val == 'SaveNext') {
            setTimeout(() => {
              this.blockUI.stop();
              this._router.navigate(['/courses/addcoursemodule/' + result.result]);
            }, 3000);
          }
        }
        else if (result.status == "-101") {
          //
          // Set the alert
          this.alert = {
            type: 'error',
            message: result.message
          };

          // Show the alert
          this.showAlert = true;
          this.blockUI.stop()
          setTimeout(() => {
            this.showAlert = false;
          }, 3000);
        }
        else {
          // Set the alert
          this.alert = {
            type: 'error',
            message: result.message
          };

          // Show the alert
          this.showAlert = true;
          this.blockUI.stop()
        }
        (error) => {
          this.blockUI.stop()
        }
      });
  
     

    // toggleCompleted($event: MatSlideToggleChange): void {
    //   //
    //   if ($event.checked != undefined) {
    //     this.active = $event.checked;
    //   }
    //   else {
    //     this.active = true;
    //   }
    //   //this.active=this.filters.hideCompleted$.next(change.checked);
    // }

  }
}
