import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-addcompanydetails',
  templateUrl: './addcompanydetails.component.html',
  styleUrls: ['./addcompanydetails.component.scss']
})


export class AddcompanydetailsComponent implements OnInit {
  showonwebsite: boolean;
  update: boolean = false;
  save: boolean = true;
  true:boolean=false;
  files: Array<any> = new Array<any>();
  fileToUpload: File = null;
  fileToUpload1: File=null;
  name: string;
  ConfigurationForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
    
};
showAlert:  boolean = false;
  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router) {

  
   }

  ngOnInit(): void {

    this.ConfigurationForm = this._formBuilder.group({
      Id:['0'],
      companyName : ['', [Validators.required]],
      address:['',[Validators.required]],
      phoneNo:['',[Validators.required]],
      email:['',],
     // UploadCourseIcon: ['',],
      CompanyUrl:['',],
      Companylogo:['',],

    });
    this.CheckForUpdate();
  }
  CheckForUpdate() {
    this._authService.Getcompanydata().subscribe((res: any) => {
      debugger
      if (res.result.length > 0) {
        this.ConfigurationForm.patchValue(res.result[0]);

       // this.ConfigurationForm.controls['Address'].setValue(res.result[0].address);
        this.ConfigurationForm.controls['Companylogo'].setValue(res.result[0].Companylogo);
        
        this.true=res.result[0].true;
        this.update = true;
        this.save = false;
      }
      else {
        this.ConfigurationForm.reset();
        this.update = false;
        this.save = true;
      }
    })
  }
  
  cancel(){
    this._router.navigate(['/masters/masternavigation']);
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
      
      // Get the contact object
      const content = this.ConfigurationForm.getRawValue();
  
     const formData: FormData = new FormData();
     
     formData.append("True", content.true)

     formData.append("Email", content.email)
     formData.append("CreatedBy", (localStorage.getItem("LoginId")));
     formData.append("phoneNo", content.phoneNo)
     formData.append("companyName", content.companyName)
     formData.append("Address", content.address)
     formData.append("CompanyUrl", content.CompanyUrl)
     formData.append("Companylogo", content.companylogo)
     formData.append("showOnWebsite", (this.showonwebsite).toString())

     if (this.files.length == 1) {
      formData.append("fileupload", this.fileToUpload, this.name);
    }
      this._authService.AddCompanyMaster(formData).subscribe((result: any) => {
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
                  // this._router.navigate(['/masters/companydetails']);
                  window.location.reload();
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

  Update() {

    if (this.ConfigurationForm.invalid) {
      return;
    }
    this.showAlert = false;

    const content = this.ConfigurationForm.getRawValue();
debugger
   
    const formData: FormData = new FormData();
    formData.append("Email", content.email)
    formData.append("Id", content.Id)
    formData.append("phoneNo", content.phoneNo)
    formData.append("companyName", content.companyName)
    formData.append("Address", content.address)
    formData.append("CompanyUrl", content.CompanyUrl)
    formData.append("Companylogo", content.Companylogo)
    formData.append("showOnWebsite", content.showonwebsite)
    formData.append("True", content.true)
 formData.append("UpdatedBy", (localStorage.getItem("LoginId")));
    if (this.files.length == 1) {
     formData.append("fileupload", this.fileToUpload, this.name);
   }
   else {
    formData.append("LogoURL", content.LogoURL);

  }



    this._authService.UpdateCompanyMaster(formData).subscribe((result: any) => {
      debugger
      if (result.status == "200") {
        debugger

        // Set the alert
        this.alert = {
          type: 'success',
          //message: result.message
          message: result.message
        };

        // Show the alert
        this.showAlert = true;

        setTimeout(() => {
          // this._router.navigate(['/masters/companydetails']);
          window.location.reload();
        }, 1000);
      }
      else {
        this.alert = {
          type: 'error',
          message: result.message

        };
        this.showAlert = true;
      }
      (error) => {

      }
    });
    // debugger
    // if(content.showOnWebsite!=undefined){
    //   this.showOnWebsite =content.showOnWebsite;
    // }
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
