import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';


@Component({
  selector: 'app-editcompanydetails',
  templateUrl: './editcompanydetails.component.html',
  styleUrls: ['./editcompanydetails.component.scss']
})
export class EditcompanydetailsComponent implements OnInit {
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
  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,) { }

  ngOnInit(): void {
    var id = this.approute.snapshot.params['id'];
    var value = this.approute.snapshot.params['value'];

    this.ConfigurationForm = this._formBuilder.group({
      companyName : ['', [Validators.required]],
      address:['',[Validators.required]],
      phoneNo:['',[Validators.required]],
      email:['',[Validators.required]],
      showOnWebsite: [''],
      CompanyUrl:['',],
      Companylogo:['',],
    });

    this.Edit(id, value);

  }
  cancel() {
    this._router.navigate(['/masters/companydetails']);
    setTimeout(() => {
      window.location.reload();
    }, 10);

  }

  Edit(id: any, value: any) {
    this.Id=id
    //debugger
    if (value == "view") {
      // this.editsite=false;
      this.butdisabled = true;
      this.ConfigurationForm.controls['companyName'].disable();
      this.ConfigurationForm.controls['address'].disable();
      this.ConfigurationForm.controls['phoneNo'].disable();
      this.ConfigurationForm.controls['email'].disable();
      this.ConfigurationForm.controls['showOnWebsite'].disable();
      this.ConfigurationForm.controls['CompanyUrl'].disable();
      this.ConfigurationForm.controls['Companylogo'].disable();

    }
    else {
      debugger
      this.butdisabled = false;
      this.ConfigurationForm.controls['companyName'].enable();
      this.ConfigurationForm.controls['address'].enable();
      this.ConfigurationForm.controls['phoneNo'].enable();
      this.ConfigurationForm.controls['email'].enable();
      this.ConfigurationForm.controls['showOnWebsite'].enable();
      this.ConfigurationForm.controls['CompanyUrl'].enable();
      this.ConfigurationForm.controls['Companylogo'].enable();
    }

    this._authService.GetCompanyMasterById(id).subscribe((finalresult: any) => {
      //debugger
      console.log(finalresult);

      if (finalresult.status == "200") {
        debugger
       // this.name= finalresult.result.companylogo
        // this.ConfigurationForm.patchValue(finalresult.result);
         this.ConfigurationForm.patchValue({
          companyName: finalresult.result.companyName,
          address: finalresult.result.address,
          email: finalresult.result.email,
          phoneNo: finalresult.result.phoneNo,
          showOnWebsite: finalresult.result.showOnWebsite,
          CompanyUrl: finalresult.result.companyUrl,
        Companylogo: finalresult.result.companylogo,
         }
        
         );

       
        this.ConfigurationForm.controls['Companylogo']

      }
      else {

      }
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
        this.name = this.fileToUpload.name.split(' ').join('-').replace(/[()]/g, "")
        this.files.push({ data: this.fileToUpload, fileName: this.name });
      }
    }
  }

  Save() {

    if (this.ConfigurationForm.invalid) {
      return;
    }
    this.showAlert = false;

    const content = this.ConfigurationForm.getRawValue();
debugger
    // var data = {
    //   Id: this.approute.snapshot.params['id'],
    //   companyName: content.companyName,
    //   Address:content.address,
    //   phoneNo:content.phoneNo,
    //   email:content.email,
    //   showOnWebsite:content.showOnWebsite,
    //   UpdatedBy: parseInt(localStorage.getItem("LoginId")),
    //   //  IsActive: this.active,
    // }
    const formData: FormData = new FormData();
    formData.append("Email", content.email)
    formData.append("Id", this.Id)
    formData.append("phoneNo", content.phoneNo)
    formData.append("companyName", content.companyName)
    formData.append("Address", content.address)
    formData.append("CompanyUrl", content.CompanyUrl)
    formData.append("Companylogo", content.Companylogo)
    formData.append("showOnWebsite", content.showOnWebsite)
 formData.append("UpdatedBy", (localStorage.getItem("LoginId")));
    if (this.files.length == 1) {
     formData.append("fileupload", this.fileToUpload, this.name);
   }



    this._authService.UpdateCompanyMaster(formData).subscribe((result: any) => {
      debugger
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
          this._router.navigate(['/masters/companydetails']);
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
