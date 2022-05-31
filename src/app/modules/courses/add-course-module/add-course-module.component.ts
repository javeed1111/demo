import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
@Component({
  selector: 'app-add-course-module',
  templateUrl: './add-course-module.component.html',
  styleUrls: ['./add-course-module.component.scss'],
  animations: fuseAnimations

})
export class AddCourseModuleComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  
  isLinear:boolean=false
  active: boolean;
  coursemoduleForm: FormGroup;
  firstFormGroup: FormGroup;

  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
};
displayedColumns = ['sno',  'ModuleName','actions'];
dataSource: MatTableDataSource<any>;
  showAlert:  boolean = false;
  courseid: any;
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
  Save: boolean=true;
  update: boolean = false;
  Clear: boolean= false;
  show: boolean;
  
  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,
    private _fuseConfirmationService: FuseConfirmationService,
    private _changeDetectorRef: ChangeDetectorRef,

    ) { }

  ngOnInit(): void {
     this.courseid = this.approute.snapshot.params['id'];

    this.coursemoduleForm = this._formBuilder.group({
      moduleId:[''],
      moduleName       : ['', [Validators.required]],
      courseName:[''],
      description:[''],
      shortDescription:['']
      // description    : ['', []],
        // userchkactive: ['']

    });
    this.Edit(this.courseid, "editcontent")
    this.GetModulesByCourseId();
  }

  ngAfterViewInit() {
    this.stepper.selectedIndex = 1; 
  }
  
  NextButton(){
    this._router.navigate(['/courses/addcoursecontent/'+this.courseid+'/'+this.coursemoduleForm.value.moduleId+'/'+"add"]);

  }
  cancel(){
    // this._router.navigate(['/courses/coursemodule/'+this.courseid]);
        // setTimeout(() => {
        //     window.location.reload();
        //    }, 10);

  }

  GoToReviews(){
    this._router.navigate(['/courses/reviews/'+this.courseid]);

  }
  GoToSubscriptions(){
    this._router.navigate(['/courses/subscriptions/'+this.courseid]);

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
         ModuleName: values.moduleName,
         CourseId:this.courseid,
         Description:values.description,
         ShortDescription:values.shortDescription,
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
                  window.location.reload();
                  // this._router.navigate(['/courses/coursemodule/'+this.courseid]);
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

  GoToPage(){
    debugger
    var value="edit"
    if(this.coursemoduleForm.value.moduleId!=""){
      this._router.navigate(['/courses/addcoursecontent/'+this.courseid+'/'+this.coursemoduleForm.value.moduleId+'/'+value]);

    }
    this.show=false
  }
  GoToPage1(){
    debugger
    this._router.navigate(['/courses/editcourse/'+this.courseid+'/'+'edit']);

  }
  GetModulesByCourseId(){

    this._authService.GetCourseModules(this.courseid).subscribe((finalresult: any) => {
      debugger

      var finalresult = JSON.parse(finalresult);
      if (finalresult.status == "200") {
        this.dataSource = new MatTableDataSource(finalresult.result);
      }
    })
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
    if (value == "add") {
      this.coursemoduleForm.controls['courseName'].disable();

      // this.coursecontentForm.controls['technologyId'].disable();
      // this.coursecontentForm.controls['description'].disable();
      // this.coursecontentForm.controls['title'].disable();



    }
    else {
      this.coursemoduleForm.controls['courseName'].enable();

      // this.coursecontentForm.controls['technologyId'].enable();
      // this.coursecontentForm.controls['description'].enable();
      // this.coursecontentForm.controls['title'].enable();

    }
      this._authService.GetcourseById(this.courseid).subscribe((result: any) => {
        debugger
         var item=result.result
        this.coursemoduleForm.controls['courseName'].setValue(item.courseName);
      });
    

    
  }

  SaveNext(){
 
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
         ModuleName: values.moduleName,
         CourseId:this.courseid,
         Description:values.description,
         ShortDescription:values.shortDescription,
         CreatedBy: parseInt(localStorage.getItem("LoginId")),
        //  IsActive: this.active,
     }
      this._authService.AddCourseModules(data).subscribe((result: any) => {
          debugger
           var result = JSON.parse(result);
            if (result.status == "200") {
              var value="add"
                //debugger
                 // Set the alert
              //    this.alert = {
              //     type   : 'success',
              //     message: result.message
              // };
              // Show the alert
              // this.showAlert = true;
                // setTimeout(() => {
                  
                //   this.showAlert = false;
                // }, 2000); 
                // setTimeout(() => {
                  
                  this._router.navigate(['/courses/addcoursecontent/'+this.courseid+'/'+result.result+'/'+value]);
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

  UpdateCourseModule(){
    debugger
    this.showAlert = false;
    if (this.coursemoduleForm.invalid) {
     
        return
      // return;
    }
    // Get the contact object
    const values = this.coursemoduleForm.getRawValue();

    // Go through the contact object and clear empty values
    //  contact.emails = contact.emails.filter(email => email.email);

    //  contact.phoneNumbers = contact.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

    //   if(this.active==undefined){
    //      this.active = true;
    //  }
    //  if(course.Duration==""){
    //    course.Duration=0
    //     }
    //     if(course.Fees==""){
    //       course.Fees=0
    //     }
    var data = {
      ModuleId:values.moduleId,
      ModuleName: values.moduleName,
      CourseId:this.courseid,
      Description:values.description,
      ShortDescription:values.shortDescription,
      UpdateBy: parseInt(localStorage.getItem("LoginId")),
     //  IsActive: this.active,
  }
    
    this._authService.UpdateCourseModules(data).subscribe((result: any) => {
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
  UpdateNext(){
    debugger
    this.showAlert = false;
    if (this.coursemoduleForm.invalid) {
     
        return
      // return;
    }
    // Get the contact object
    const values = this.coursemoduleForm.getRawValue();

    // Go through the contact object and clear empty values
    //  contact.emails = contact.emails.filter(email => email.email);

    //  contact.phoneNumbers = contact.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

    //   if(this.active==undefined){
    //      this.active = true;
    //  }
    //  if(course.Duration==""){
    //    course.Duration=0
    //     }
    //     if(course.Fees==""){
    //       course.Fees=0
    //     }
    var data = {
      ModuleId:values.moduleId,
      ModuleName: values.moduleName,
      CourseId:this.courseid,
      Description:values.description,
      ShortDescription:values.shortDescription,
      UpdateBy: parseInt(localStorage.getItem("LoginId")),
     //  IsActive: this.active,
  }
    
    this._authService.UpdateCourseModules(data).subscribe((result: any) => {
      //debugger
      var result = JSON.parse(result);
      if (result.status == "200") {
        //debugger
        var value="add"

        // Set the alert
        this.alert = {
          type: 'success',
          message: result.message
        };

        // Show the alert
        this.showAlert = true;
        setTimeout(() => {
          this._router.navigate(['/courses/addcoursecontent/'+this.courseid+'/'+values.moduleId+'/'+value]);
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
  clear(){
    this.coursemoduleForm.controls['moduleName'].setValue('');
    this.coursemoduleForm.controls['description'].setValue('');
      this.coursemoduleForm.controls['shortDescription'].setValue('');
      this.Save=true;
      this.update=false;

  }

  EditFromGrid(id: any,value: any) {
    debugger
    var baseurl = this._authService.baseUrl;
    if (baseurl == "https://localhost:44358/") {
      baseurl = "https://localhost:44358"
    }
    if (baseurl == "http://testugetitapi.fadelsoft.com/") {
      baseurl = "http://testugetitapi.fadelsoft.com"
    }
    if (value == "viewcontent") {
      this.coursemoduleForm.controls['moduleName'].disable();
      this.coursemoduleForm.controls['description'].disable();
      this.coursemoduleForm.controls['shortDescription'].disable();

      this.Save=true;
      this.update=false;
      this.Clear=false;
    }
    else {
      this.coursemoduleForm.controls['courseName'].disable();
      this.coursemoduleForm.controls['moduleName'].enable();
      this.coursemoduleForm.controls['description'].enable();
      this.coursemoduleForm.controls['shortDescription'].enable();

      this.Save=false;
      this.update=true;
      this.Clear=true;
    }
    this._authService.GetCourseModulesById(id).subscribe((finalresult: any) => {
      debugger
      console.log(finalresult);
      //  var finalresult = JSON.parse(result);
      // rolebyid=finalresult;
      if (finalresult.status == "200") {
        debugger

        this.coursemoduleForm.patchValue(finalresult.result);
        const course = this.coursemoduleForm.getRawValue();
        console.log('coursecontent',course)
        // this.remove=true
        // if (course.duration == 0) {
        //   this.courseForm.controls['duration'].setValue("")
        // }
        // if (course.fees == 0) {
        //   this.courseForm.controls['fees'].setValue("")
        // }
        // if (finalresult.result.imageURL != null) {
        //   this.ImageURL = baseurl + finalresult.result.imageURL;

        // }
        // else {

        // }

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
  deleteFromGrid(id:any): void
    {
      debugger
      this.showAlert=false
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete course',
            message: 'Are you sure you want to delete this CourseContent?',
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
           var CreatedBy= parseInt(localStorage.getItem("LoginId"))
           var data={
            Id:id
           }
                // Delete the contact
                this._authService.DeleteCourseModule(id).subscribe((data:any) => {
                    //debugger
                    if (data.status == "200") {
                        
                          
                        this.alert = {
                            type   : 'success',
                            message: data.message
                        
                        };
                        this.showAlert=true
                      //  this._router.navigate(['/userconfig/role/']);
                        setTimeout(() => {
                            window.location.reload();
                        }, 0);
                        
                      }
                      else {
                        this.alert = {
                          type   : 'error',
                          message: data.message
                      
                      };
                      this.showAlert=true
                        // this.notifications.alert('Alert', result.message, NotificationType.Alert, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false });
                      }

                        // Return if the contact wasn't deleted...
                        // if ( !isDeleted )
                        // {
                        //     return;
                        // }

                        // // Navigate to the next contact if available
                        // if ( nextContactId )
                        // {
                        //     this._router.navigate(['../', nextContactId], {relativeTo: this._activatedRoute});
                        // }
                        // // Otherwise, navigate to the parent
                        // else
                        // {
                        //     this._router.navigate(['../'], {relativeTo: this._activatedRoute});
                        // }

                        // Toggle the edit mode off
                        // this.toggleEditMode(false);
                    });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });

    }
}
