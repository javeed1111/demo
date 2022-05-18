import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
@Component({
  selector: 'app-add-course-module',
  templateUrl: './add-course-module.component.html',
  styleUrls: ['./add-course-module.component.scss']
})
export class AddCourseModuleComponent implements OnInit {
  active: boolean;
  coursemoduleForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
};
showAlert:  boolean = false;
  courseid: any;
  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
     this.courseid = this.approute.snapshot.params['id'];

    this.coursemoduleForm = this._formBuilder.group({
      modulename       : ['', [Validators.required]],
      // description    : ['', []],
        // userchkactive: ['']

    });
  }

  cancel(){
    this._router.navigate(['/courses/coursemodule/'+this.courseid]);
        setTimeout(() => {
            window.location.reload();
           }, 10);

  }

  AddCourseModule()
  {
      debugger
      if (this.coursemoduleForm.invalid) {
          return;
      }
      //this.showAlert = false;
      
      // Get the contact object
      const values = this.coursemoduleForm.getRawValue();
    //   if(this.active==undefined){
    //      this.active = true;
    //  }
      var data = {
         ModuleName: values.modulename,
         CourseId:this.courseid,
         CreatedBy: parseInt(localStorage.getItem("LoginId")),
        //  IsActive: this.active,
     }
      this._authService.AddCourseModules(data).subscribe((result: any) => {
          debugger
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
                  
                  this.showAlert = false;
                }, 2000); 
                // setTimeout(() => {
                  
                  this._router.navigate(['/courses/coursemodule/'+this.courseid]);
                // }, 2000); 
                
            }
            else {
             // Set the alert
             this.alert = {
              type   : 'error',
              message: result.message
          };
          // Show the alert
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 2000);
            }
            (error) => {
   
           }
        });
  }

}
