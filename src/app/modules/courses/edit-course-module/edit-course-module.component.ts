import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
@Component({
  selector: 'app-edit-course-module',
  templateUrl: './edit-course-module.component.html',
  styleUrls: ['./edit-course-module.component.scss']
})
export class EditCourseModuleComponent implements OnInit {

active: boolean;
  coursemoduleForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
};
showAlert:  boolean = false;
moduleid: any;
  courseid: any;
  butdisabled: boolean;

  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,
    ) { }


  ngOnInit(): void {
    debugger
    this.moduleid = this.approute.snapshot.params['id'];
    this.courseid=this.approute.snapshot.params['courseid'];
    var value=this.approute.snapshot.params['value'];
    this.coursemoduleForm = this._formBuilder.group({
      moduleName       : ['', [Validators.required]],
      // description    : ['', []],
        // userchkactive: ['']

    });
    this.Edit(this.moduleid,value);
  }

  cancel(){
    this._router.navigate(['/courses/coursemodule/'+this.courseid]);
        setTimeout(() => {
            window.location.reload();
           }, 10);

  }

  Edit(id: any, value: any) {
    //debugger
    if (value == "view") {
      // this.editsite=false;
      this.butdisabled=true;
      this.coursemoduleForm.controls['moduleName'].disable();
      // this.roleForm.controls['description'].disable();
  }
  else
  {
    this.butdisabled=false;
            this.coursemoduleForm.controls['moduleName'].enable();
            // this.roleForm.controls['description'].enable();

  }
    // this.Id = id;
    this._authService.GetCourseModulesById(id).subscribe((finalresult: any) => {
        //debugger
        console.log(finalresult);
      //  var finalresult = JSON.parse(result);
      // rolebyid=finalresult;
        if (finalresult.status == "200") {
          //debugger

          this.coursemoduleForm.patchValue(finalresult.result);
         
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

  EditCourseModule(){

    if (this.coursemoduleForm.invalid) {
      return;
  }
  this.showAlert = false;
  
  // Get the contact object
  const contact = this.coursemoduleForm.getRawValue();

  // Go through the contact object and clear empty values
 //  contact.emails = contact.emails.filter(email => email.email);

 //  contact.phoneNumbers = contact.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

 
  var data = {
     ModuleId:this.moduleid,
     ModuleName: contact.moduleName,
     CourseId:this.courseid,
     UpdatedBy: parseInt(localStorage.getItem("LoginId")),
 }
  this._authService.UpdateCourseModules(data).subscribe((result: any) => {
      
    //debugger
       var result = JSON.parse(result);
        if (result.status == "200") {
            //debugger
            
             // Set the alert
             this.alert = {
              type   : 'success',
              message: result.message 
          };

          // Show the alert
          this.showAlert = true;
         
            setTimeout(() => {
              this._router.navigate(['/courses/coursemodule/'+this.courseid]);
            }, 1000);
        }
        else {
         this.alert = {
             type   : 'error',
             message: result.message
         
         };
         this.showAlert = true;
        }
        (error) => {

       }
    });

  }

}
