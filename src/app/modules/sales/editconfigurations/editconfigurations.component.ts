import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-editconfigurations',
  templateUrl: './editconfigurations.component.html',
  styleUrls: ['./editconfigurations.component.scss']
})
export class EditconfigurationsComponent implements OnInit {
  ConfigurationForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;
  butdisabled: boolean;
  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,) { }

  ngOnInit(): void {
    var id = this.approute.snapshot.params['id'];
    var value = this.approute.snapshot.params['value'];

    this.ConfigurationForm = this._formBuilder.group({
      invoiceFormat: ['', [Validators.required]],
      invoiceStartNo: ['', [Validators.required]]
    });

    this.Edit(id, value);

  }

  cancel() {
    this._router.navigate(['/masters/configurations']);
    setTimeout(() => {
      window.location.reload();
    }, 10);

  }

  Edit(id: any, value: any) {
    //
    if (value == "view") {
      // this.editsite=false;
      this.butdisabled = true;
      this.ConfigurationForm.controls['invoiceFormat'].disable();
      this.ConfigurationForm.controls['invoiceStartNo'].disable();

    }
    else {
      this.butdisabled = false;
      this.ConfigurationForm.controls['invoiceFormat'].enable();
      this.ConfigurationForm.controls['invoiceStartNo'].disable();
    }

    this._authService.GetInvoiceNoFormatById(id).subscribe((finalresult: any) => {
      //
      console.log(finalresult);

      if (finalresult.status == "200") {
        //

        this.ConfigurationForm.patchValue(finalresult.result);

      }
      else {

      }
    });
  }

  Save() {
    if (this.ConfigurationForm.invalid) {
      return;
    }
    this.showAlert = false;

    const content = this.ConfigurationForm.getRawValue();

    var data = {
      Id: this.approute.snapshot.params['id'],
      InvoiceFormat: content.invoiceFormat,
      InvoiceStartNo:content.invoiceStartNo,
      UpdatedBy: parseInt(localStorage.getItem("LoginId")),
      //  IsActive: this.active,
    }
    this._authService.UpdateInvoiceNoFormat(data).subscribe((result: any) => {

      //
      if (result.status == "200") {
        //

        // Set the alert
        this.alert = {
          type: 'success',
          message: result.message
        };

        // Show the alert
        this.showAlert = true;

        setTimeout(() => {
          this._router.navigate(['/masters/configurations']);
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
  }

}
