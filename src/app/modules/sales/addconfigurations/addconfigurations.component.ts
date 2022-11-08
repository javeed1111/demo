import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-addconfigurations',
  templateUrl: './addconfigurations.component.html',
  styleUrls: ['./addconfigurations.component.scss']
})
export class AddconfigurationsComponent implements OnInit {
  ConfigurationForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
};
showAlert:  boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.ConfigurationForm = this._formBuilder.group({
      invoiceFormat : ['', [Validators.required]],
      invoiceStartNo:['',[Validators.required]]
    });
  }

  cancel(){
    this._router.navigate(['/masters/configurations']);
        setTimeout(() => {
            window.location.reload();
           }, 10);

  }
  
  Save()
  {
      
      if (this.ConfigurationForm.invalid) {
          return;
      }
      //this.showAlert = false;
      
      // Get the contact object
      const content = this.ConfigurationForm.getRawValue();
    //   if(this.active==undefined){
    //      this.active = true;
    //  }
      var data = {
        InvoiceFormat: content.invoiceFormat,
        InvoiceStartNo:content.invoiceStartNo,
         CreatedBy: parseInt(localStorage.getItem("LoginId")),
        //  IsActive: this.active,
     }
      this._authService.AddInvoiceNoFormat(data).subscribe((result: any) => {
          
          //  var result = JSON.parse(result);
            if (result.status == "200") {
                //
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
                  this._router.navigate(['/masters/configurations']);
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
