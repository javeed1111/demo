import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
@Component({
  selector: 'app-editcourse',
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EditcourseComponent implements OnInit {
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
  technology: any;
  files: Array<any> = new Array<any>();
  fileToUpload: File = null;
  name: string;
  profileImage: any;
  ImageURL: any;
  butdisabled:boolean=false;
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

  constructor(

    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    debugger;
    var loginId = localStorage.getItem("LoginId");
    var id = this.approute.snapshot.params['id'];
    var value = this.approute.snapshot.params['value'];
    
    this.GetTechnologys();


    this.courseForm = this._formBuilder.group({
      courseName: ['', [Validators.required]],
      technologyId: ['', []],
      description: ['', []],
      title: ['', []],
      duration: ['', [Validators.required]],
      units: ['', []],
      fees: [''],
      imageURL: ['', []],
      //isActive       : ['']

    });
    this.Edit(id,value);
  }
  cancel() {
    this._router.navigate(['/courses/course']);
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }
  onSelectFile(files: FileList) {
    debugger
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
  GetTechnologys() {
    debugger
    this._authService.GetTechnologies().subscribe((finalresult: any) => {
      debugger
      var finalresult = JSON.parse(finalresult);
      if (finalresult.status == "200") {
        debugger
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
  Edit(id:any,value:any) {
    debugger
    var baseurl = this._authService.baseUrl;
    if (baseurl == "https://localhost:44358/") {
      baseurl = "https://localhost:44358"
    }
    if (baseurl == "http://testugetitapi.fadelsoft.com/") {
      baseurl = "http://testugetitapi.fadelsoft.com"
    }
    if (value == "view") {
      // this.editsite=false;
      this.butdisabled=true;
      this.courseForm.controls['courseName'].disable();
      this.courseForm.controls['technologyId'].disable();
      this.courseForm.controls['description'].disable();
      this.courseForm.controls['title'].disable();
      this.courseForm.controls['duration'].disable();
      this.courseForm.controls['units'].disable();
      this.courseForm.controls['fees'].disable();



  }
  else
  {
    this.butdisabled=false;
    this.courseForm.controls['courseName'].enable();
    this.courseForm.controls['technologyId'].enable();
    this.courseForm.controls['description'].enable();
    this.courseForm.controls['title'].enable();
    this.courseForm.controls['duration'].enable();
    this.courseForm.controls['units'].enable();
    this.courseForm.controls['fees'].enable();

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
        if (course.duration == 0) {
          this.courseForm.controls['duration'].setValue("")
        }
        if (course.fees == 0) {
          this.courseForm.controls['fees'].setValue("")
          // course.fees="";
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

    // Go through the contact object and clear empty values
    //  contact.emails = contact.emails.filter(email => email.email);

    //  contact.phoneNumbers = contact.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

    // if (course.isActive == undefined) {
    //   course.isActive = true;
    // }
    if (course.duration == "") {
      course.duration = 0
      // this.courseForm.controls['Duration'].setValue(0)
    }
    if (course.fees == "") {
      course.fees = 0
      // this.courseForm.controls['Fees'].setValue(0)
      // course.fees="";
    }
    const formData: FormData = new FormData();
    formData.append("CourseName", course.courseName)
    formData.append("TechnologyId", course.technologyId)
    formData.append("UpdatedBy", (localStorage.getItem("LoginId")));
    formData.append("Description", course.description)
    formData.append("Title", course.title)
    formData.append("CourseId", this.approute.snapshot.params['id'])
    formData.append("Duration", course.duration)
    formData.append("Units",course.units)
    formData.append("Fees", course.fees)
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

      debugger
      var result = JSON.parse(result);
      if (result.status == "200") {
        debugger
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
          type   : 'error',
          message: result.message
      };

      // Show the alert
      this.showAlert = true;
      }
      (error) => {

      }
    });
  }
  toggleCompleted($event: MatSlideToggleChange): void {
    debugger
    if ($event.checked != undefined) {
      this.isActive = $event.checked;
    }
    else {
      this.isActive = true;
    }
    //this.active=this.filters.hideCompleted$.next(change.checked);
  }

}
