import { Component, ElementRef, OnInit, ViewChild,AfterViewInit,ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-addtechnology',
  templateUrl: './addtechnology.component.html',
  styleUrls: ['./addtechnology.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AddtechnologyComponent implements OnInit {
  // @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
  active: boolean;
  techForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
};
showAlert:  boolean = false;
files: Array<any> = new Array<any>();
fileToUpload: File = null;
name: string;
imageSrc
  

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    // private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.techForm = this._formBuilder.group({
      technologyName : ['', [Validators.required]],
        // userchkactive: ['']

    });
  }
  cancel(){
    this._router.navigate(['/courses/technology/']);
        setTimeout(() => {
            window.location.reload();
           }, 10);


  }


  // ngAfterViewInit()
  // {
  //   //debugger;
  //   this.item.nativeElement.focus();
  //   this.cdr.detectChanges();
  // }
  onSelectFile(files: FileList) {
    //debugger
    if (files.length === 0)
        return;
    if (files.length > 0) {
        this.files = [];
        for (var i = 0; i < files.length; i++) {
            this.fileToUpload = files.item(i);
            const fileReader: FileReader = new FileReader();
            fileReader.readAsDataURL(this.fileToUpload);
            this.name=this.fileToUpload.name.split(' ').join('-').replace(/[()]/g,"")
            this.files.push({ data: this.fileToUpload, fileName:this.name });
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
// reset(element) {
//   element.value = "";
//   }
  AddTechnology()
  {
    this.showAlert=false
      //debugger
      if (this.techForm.invalid) {
          return;
      }
      const technology = this.techForm.getRawValue();

      if(this.active==undefined){
         this.active = true;
     }
     const formData: FormData = new FormData();
     formData.append("TechnologyName",technology.technologyName)
            formData.append("CreatedBy",(localStorage.getItem("LoginId")));
        if (this.files.length == 1) {
            formData.append("fileupload",this.fileToUpload , this.name);
        }
        console.log('formdata',formData)
        this._authService.Addtechnology(formData).subscribe((result: any) => {
          //debugger
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
                  this._router.navigate(['/courses/technology']);
                }, 1000);
            }
            else {
             // Set the alert
             this.alert = {
              type   : 'error',
              message: result.message
          };

          // Show the alert
          this.showAlert = true;
            }
            (error) => {
   
           }
        });
  }
  // toggleCompleted($event: MatSlideToggleChange): void
  //   {
  //       //debugger
  //       if($event.checked!=undefined){
  //           this.active = $event.checked;
  //       }
  //       else{
  //           this.active = true;
  //       }
  //       //this.active=this.filters.hideCompleted$.next(change.checked);
  //   }  

}

