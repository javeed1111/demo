import { Component, OnInit } from '@angular/core';
import {ViewChild, ViewEncapsulation } from '@angular/core';
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
@Component({
  selector: 'app-addtermsandpolicy',
  templateUrl: './addtermsandpolicy.component.html',
  styleUrls: ['./addtermsandpolicy.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddtermsandpolicyComponent implements OnInit {
  uploadvideo: boolean = true
  deletevideo: boolean = false
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
 
  active: boolean;
  ConfigurationForm: FormGroup;
 // secondFormGroup: FormGroup;
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
  courses: any;
  public instructor: FormControl = new FormControl();
  public instructorfilterctrl: FormControl = new FormControl();
  public filteredfaculties: ReplaySubject<any> = new ReplaySubject(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  protected _onDestroy = new Subject();
 
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _fuseConfirmationService: FuseConfirmationService,) { }

    ngOnInit(): void {
      debugger
      
      // this.secondFormGroup = this._formBuilder.group({
      //   secondCtrl: ['', Validators.required],
      // });
      this.ConfigurationForm = this._formBuilder.group({
        tabName: ['', [Validators.required]],
       
        description: ['', []],
       
        onwebsite: [''],
        
        // UploadCourseIcon: ['', [Validators.required]],
        //  UploadCourseVideo:['',[Validators.required]],
        // UploadImage: ['', [Validators.required]],
  
        
      });
      // var currentdate=new Date()
  
   
     
    }

  Save()
  {
    debugger
    if (this.ConfigurationForm.invalid) {
        return;
    }
    if(this.showonwebsite==undefined){
      this.showonwebsite=true
    }
   // formdata.append("showOnWebsite", (this.showonwebsite).toString())
    //this.showAlert = false;
    const content = this.ConfigurationForm.getRawValue();
  //   if(this.active==undefined){
  //      this.active = true;
  //  }
    var data = {
    
      showOnWebsite:this.showonwebsite,
      TabName: content.tabName,
      Description: content.description, 
       CreatedBy: parseInt(localStorage.getItem("LoginId")),
       
  }
  

    this._authService.AddTermspolicy(data).subscribe((result: any) => {
        debugger
        //  var result = JSON.parse(result);
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
                this._router.navigate(['/masters/termsandpolicy']);
              }, 2000); 
              // setTimeout(() => {
                // this._router.navigate(['/masters/companydetails']);
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
  cancel(){
    this._router.navigate(['/masters/termsandpolicy']);
        setTimeout(() => {
            window.location.reload();
           }, 10);

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

}
