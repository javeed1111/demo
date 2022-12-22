import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-edittechnology',
  templateUrl: './edittechnology.component.html',
  styleUrls: ['./edittechnology.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EdittechnologyComponent implements OnInit {
  active: boolean;
  techForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  imageSrc
  showAlert: boolean = false;
  Id: any;
  userId: any;
  isActive: boolean;
  files: Array<any> = new Array<any>();
  fileToUpload: File = null;
  name: string;
  profileImage: any;
  ImageURL: any;
  butdisabled: Boolean = false;

  constructor(

    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    //;
    var loginId = localStorage.getItem("LoginId");
    var id = this.approute.snapshot.params['id'];
    var value = this.approute.snapshot.params['value'];



    this.techForm = this._formBuilder.group({
      technologyName: ['', [Validators.required]],
      imageURL: ['', []],
      isActive: ['']

    });
    this.Edit(id, value);
  }
  cancel() {
    this._router.navigate(['/courses/technology']);
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }
  onSelectFile(files: FileList) {
    //
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
        const reader = new FileReader();
        if (files && files[0]) {
          const file = files[0];
          const reader = new FileReader();
          reader.onload = e => this.imageSrc = reader.result;
          reader.readAsDataURL(file);
        }
      }
    }
  }
  Edit(id: any, value: any) {
    debugger
    var baseurl = this._authService.baseUrl;
    if (baseurl == "https://localhost:44358/") {
      baseurl = "https://localhost:44358"
    }
    if (baseurl == "http://testugetitapi.fadelsoft.com/") {
      baseurl = "http://testugetitapi.fadelsoft.com"
    }
    if (value == "view") {
      // this.editsite=false;
      this.butdisabled = true;
      this.techForm.controls['technologyName'].disable();
      this.techForm.controls['isActive'].disable();
    }
    else {
      this.butdisabled = false;
      this.techForm.controls['technologyName'].enable();
      this.techForm.controls['isActive'].enable();

    }
    debugger
    this.Id = id;
    this._authService.GetechnologyById(this.Id).subscribe((finalresult: any) => {
      //
      console.log(finalresult);
      //  var finalresult = JSON.parse(result);
      // rolebyid=finalresult;
      if (finalresult.status == "200") {
        //

        this.techForm.patchValue(finalresult.result);
        if (finalresult.result.imageURL != null) {
          this.ImageURL = finalresult.result.imageUrl;
          // this.noimage=true;;

        }
        else {
          // this.ImageURL = baseurl+"/technologyFiles/dummy identityproof.png";
          // this.noimage=false;

        }

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

  Updatetechnology() {
    this.showAlert = false;
    //
    if (this.techForm.invalid) {
      return;
    }

    // Get the contact object
    const tech = this.techForm.getRawValue();

    // Go through the contact object and clear empty values
    //  contact.emails = contact.emails.filter(email => email.email);

    //  contact.phoneNumbers = contact.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

    if (tech.isActive == undefined) {
      tech.isActive = true;
    }
    const formData: FormData = new FormData();
    formData.append("TechnologyName", tech.technologyName)
    formData.append("UpdatedBy", (localStorage.getItem("LoginId")));
    formData.append("TechnologyId", this.approute.snapshot.params['id'])
    if (this.files.length == 1) {
      formData.append("fileupload", this.fileToUpload, this.name);
    }
    else {
      formData.append("imageURL", tech.imageURL);

    }
    console.log('formdata', formData)
    //   var data = {
    //     TechnologyName: tech.technologyName,
    //      UpdatedBy: parseInt(localStorage.getItem("LoginId")),
    //      IsActive: tech.isActive,
    //      TechnologyId:this.approute.snapshot.params['id'],
    //  }
    this._authService.Updatetechnology(formData).subscribe((result: any) => {

      //
      var result = JSON.parse(result);
      if (result.status == "200") {
        //
        // Show the alert
        this.alert = {
          type: 'success',
          message: result.message
        };
        this.showAlert = true;

        setTimeout(() => {
          window.location.reload();
          //this._router.navigate(['/courses/technology']);
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
  toggleCompleted($event: MatSlideToggleChange): void {
    //
    if ($event.checked != undefined) {
      this.isActive = $event.checked;
    }
    else {
      this.isActive = true;
    }
    //this.active=this.filters.hideCompleted$.next(change.checked);
  }

}
