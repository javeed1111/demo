import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
@Component({
  selector: 'app-edittermsandpolicy',
  templateUrl: './edittermsandpolicy.component.html',
  styleUrls: ['./edittermsandpolicy.component.scss']
})
export class EdittermsandpolicyComponent implements OnInit {
  showOnWebsite: boolean; 
  files: Array<any> = new Array<any>();
  fileToUpload: File = null;
  name: string;

  ConfigurationForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;
  butdisabled: boolean;
  Id: any;
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
  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,) { }

  ngOnInit(): void {
    var id = this.approute.snapshot.params['id'];
    var value = this.approute.snapshot.params['value'];

    this.ConfigurationForm = this._formBuilder.group({
      tabName : ['',],
     
      showOnWebsite: [''],
      Fulldescription:['',],
      description:['',],
    
  });

  this.Edit(id, value);

}
cancel() {
  this._router.navigate(['/masters/termsandpolicy']);
  setTimeout(() => {
    window.location.reload();
  }, 10);

}
  Edit(id: any, value: any) {
    this.Id=id
    debugger
    if (value == "view") {
      // this.editsite=false;
      this.butdisabled = true;
      this.ConfigurationForm.controls['tabName'].disable();
      this.ConfigurationForm.controls['description'].disable();
     this.ConfigurationForm.controls['showOnWebsite'].disable();
     

    }
    else {
      debugger
      this.butdisabled = false;
      this.ConfigurationForm.controls['tabName'].enable();
      this.ConfigurationForm.controls['description'].enable();
      this.ConfigurationForm.controls['showOnWebsite'].enable();
     
    }

    this._authService.GetTermspolicyById(id).subscribe((finalresult: any) => {
      debugger
      console.log(finalresult);

      if (finalresult.status == "200") {
        debugger
       // this.name= finalresult.result.companylogo
        // this.ConfigurationForm.patchValue(finalresult.result);
         this.ConfigurationForm.patchValue({
          tabName: finalresult.result.tabName,
          description: finalresult.result.description,
          showOnWebsite: finalresult.result.showOnWebsite,
         }
        
         );
      }
      else {

      }
    });
  }

  Save() {
debugger
    if (this.ConfigurationForm.invalid) {
      return;
    }
    this.showAlert = false;

    const content = this.ConfigurationForm.getRawValue();
debugger
    var data = {
      Id: this.approute.snapshot.params['id'],
      TabName: content.tabName,
      Description:content.description,
     
      showOnWebsite:content.showOnWebsite,
      UpdatedBy: parseInt(localStorage.getItem("LoginId")),
       //  IsActive: this.active,
     }

 
    this._authService.UpdateTermsPolicies(data).subscribe((result: any) => {
      
      //debugger
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
                this._router.navigate(['/masters/termsandpolicy']);
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
    debugger
    if(content.showOnWebsite!=undefined){
      this.showOnWebsite =content.showOnWebsite;
    }
  }

  onwebsite($event: MatSlideToggleChange): void {
    debugger
    if ($event.checked == undefined || $event.checked == true) {
      this.showOnWebsite = $event.checked;
    }
    else {
      this.showOnWebsite = false;
      // this.isofferactive = false;
    }

  }
}
