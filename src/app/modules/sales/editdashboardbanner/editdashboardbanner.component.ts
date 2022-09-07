import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-editdashboardbanner',
  templateUrl: './editdashboardbanner.component.html',
  styleUrls: ['./editdashboardbanner.component.scss']
})
export class EditdashboardbannerComponent implements OnInit {
  bannerForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
};
showAlert:  boolean = false;
  butdisabled: boolean;

  constructor( private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,) { }

  ngOnInit(): void {
    var id = this.approute.snapshot.params['id'];
    var value = this.approute.snapshot.params['value'];

    this.bannerForm = this._formBuilder.group({
      title       : ['', [Validators.required]],
      description    : ['', []],
  

    });
    this.Edit(id,value);
  }

  cancel(){
    this._router.navigate(['/masters/dashboardbanner/']);
        setTimeout(() => {
            window.location.reload();
           }, 10);

  }

  Edit(id: any, value: any) {
    //debugger
    if (value == "view") {
      // this.editsite=false;
      this.butdisabled=true;
      this.bannerForm.controls['title'].disable();
      this.bannerForm.controls['description'].disable();
  }
  else
  {
    this.butdisabled=false;
            this.bannerForm.controls['title'].enable();
            this.bannerForm.controls['description'].enable();

  }
  
    this._authService.GetBannerContentById(id).subscribe((finalresult: any) => {
        //debugger
        console.log(finalresult);
    
        if (finalresult.status == "200") {
          //debugger

          this.bannerForm.patchValue(finalresult.result);
         
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

  Save(){
    if (this.bannerForm.invalid) {
      return;
  }
  this.showAlert = false;
  
  const content = this.bannerForm.getRawValue();

  var data = {
    Id:this.approute.snapshot.params['id'],
    Title: content.title,
     Description: content.description,
     UpdatedBy: parseInt(localStorage.getItem("LoginId")),
    //  IsActive: this.active,
 }
  this._authService.UpdateBannerContent(data).subscribe((result: any) => {
      
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
              this._router.navigate(['/masters/dashboardbanner']);
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
