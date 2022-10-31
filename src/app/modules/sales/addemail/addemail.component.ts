import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';


@Component({
  selector: 'app-addemail',
  templateUrl: './addemail.component.html',
  styleUrls: ['./addemail.component.scss']
})
export class AddemailComponent implements OnInit {

  ConfigurationForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''

  };
  showAlert: boolean = false;
  update: boolean = false;
  save: boolean = true;
  smtpSsl:boolean=false;

  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router) {

  }

  ngOnInit(): void {

    this.ConfigurationForm = this._formBuilder.group({
      id:['0'],
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
      sender: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      portNo: ['', [Validators.required]],
      displayName: ['', [Validators.required]],
    });
    this.CheckForUpdate();
  }
  CheckForUpdate() {
    this._authService.GetAllEmail().subscribe((res: any) => {
      debugger
      if (res.result.length > 0) {
        this.ConfigurationForm.patchValue(res.result[0]);
        this.smtpSsl=res.result[0].smtpSsl;
        this.update = true;
        this.save = false
      }
      else {
        this.ConfigurationForm.reset();
        this.update = false;
        this.save = true;
      }
    })
  }
  cancel() {
    this._router.navigate(['/masters/masternavigation']);
  }
  Save() {
    debugger
    if (this.ConfigurationForm.invalid) {
      return;
    }

    const content = this.ConfigurationForm.getRawValue();

    debugger
    var data = {
      SmtpSsl: this.smtpSsl,
      user: content.user,
      password: content.password,
      sender: content.sender,
      subject: content.subject,
      portNo: content.portNo,
      displayName: content.displayName,
      CreatedBy: parseInt(localStorage.getItem("LoginId")),
      //  IsActive: this.active,
    }
    this._authService.AddEmail(data).subscribe((result: any) => {
      debugger
      //  var result = JSON.parse(result);
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

          this.showAlert = false;
          window.location.reload();
        }, 2000);
        // setTimeout(() => {
        // }, 2000); 

      }
      else {
        // Set the alert
        this.alert = {
          type: 'error',
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
    var data = {
      Id: content.id,
      User: content.user,
      Password: content.password,
      Sender: content.sender,
      Subject: content.subject,
      PortNo: content.portNo,
      DisplayName: content.displayName,
      SmtpSsl:this.smtpSsl,
      UpdatedBy: parseInt(localStorage.getItem("LoginId")),
      //  IsActive: this.active,
    }
    this._authService.UpdateEmail(data).subscribe((result: any) => {
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
          this.showAlert = false;
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
  }

  onwebsite(value: boolean): void {
    debugger
    if (value == true) {
      this.smtpSsl = value;
    }
    else {
      this.smtpSsl = false;
      // this.isofferactive = false;
    }

  }
}
