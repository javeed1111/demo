import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import {MatInputModule} from '@angular/material/input'
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AddcourseComponent implements OnInit {
  active: boolean;
  courseForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
};
showAlert:  boolean = false;
  Id: any;
  technology: any;
  technologyId
  files: Array<any> = new Array<any>();
fileToUpload: File = null;
name: string;
quillModules: any = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
['blockquote', 'code-block'],

[{ 'header': 1 }, { 'header': 2 }],               // custom button values
[{ 'list': 'ordered'}, { 'list': 'bullet' }],
[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
[{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
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
  ) { }

  ngOnInit(): void {
    this.GetTechnologys();
    this.courseForm = this._formBuilder.group({
      courseName   : ['', [Validators.required]],
      technologyId : ['', []],
      Description  : ['', []],
      Title        :['', []],
      Duration     :['', [Validators.required]],
      Fees         :['', []],
      units        :['', []],
      // userchkactive: ['']

    });
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
            this.name=this.fileToUpload.name.split(' ').join('-').replace(/[()]/g,"")
            this.files.push({ data: this.fileToUpload, fileName:this.name });
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
        this.technology= finalresult.result;
        //this.roles = finalresult.result;
        console.log('techs',this.technology)
        //const dataSource = this.roles ;
      }
      else {
        
      }
  });
  }
  cancel(){
    this._router.navigate(['/courses/course/']);
        setTimeout(() => {
            window.location.reload();
           }, 10);

  }
  AddCourse()
  {
      debugger
      this.showAlert=false;
      if (this.courseForm.invalid) {
          return;
      }
      
      // Get the contact object
      const course = this.courseForm.getRawValue();

      // Go through the contact object and clear empty values
     //  contact.emails = contact.emails.filter(email => email.email);

     //  contact.phoneNumbers = contact.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

    //   if(this.active==undefined){
    //      this.active = true;
    //  }
     if(course.Duration==""){
       course.Duration=0
          // this.courseForm.controls['Duration'].setValue(0)
        }
        if(course.Fees==""){
          course.Fees=0
          // this.courseForm.controls['Fees'].setValue(0)
          // course.fees="";
        }
     const formData: FormData = new FormData();
            formData.append("CourseName",course.courseName)
            formData.append("CreatedBy",(localStorage.getItem("LoginId")));
            formData.append("TechnologyId",course.technologyId)
            formData.append("Description",course.Description)
            formData.append("Title",course.Title)
            formData.append("Duration",course.Duration)
            formData.append("Units",course.units)
            formData.append("Fees",course.Fees)
        if (this.files.length == 1) {
            formData.append("fileupload",this.fileToUpload , this.name);
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
           var result = JSON.parse(result);
            if (result.status == "200") {
                debugger
                 // Set the alert
                 this.alert = {
                  type   : 'success',
                  message: result.message
              };

              // Show the alert
              this.showAlert = true;
                setTimeout(() => {
                  this._router.navigate(['/courses/course']);
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
  toggleCompleted($event: MatSlideToggleChange): void
    {
        debugger
        if($event.checked!=undefined){
            this.active = $event.checked;
        }
        else{
            this.active = true;
        }
        //this.active=this.filters.hideCompleted$.next(change.checked);
    }

}
