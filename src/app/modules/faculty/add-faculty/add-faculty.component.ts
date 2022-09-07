import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.scss']
})
export class AddFacultyComponent implements OnInit {
  active: boolean;
  FacultyForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;
  files: Array<any> = new Array<any>();
  fileToUpload: File = null;
  name: string;
  imageSrc:any;
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

    ]
  };
  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.FacultyForm = this._formBuilder.group({
      firstName : ['', [Validators.required]],
      lastName : ['', ],
      displayName : ['', ],
      shortDescription : ['', ],
      longDescription : ['',],
      experience : ['', ],

    });
    
  }

  cancel() {
    this._router.navigate(['/faculty/facultydetails/']);
    setTimeout(() => {
      window.location.reload();
    }, 10);


  }

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
 
  AddFaculty() {
    this.showAlert = false
    debugger
    if (this.FacultyForm.invalid) {
      return;
    }
    const faculty = this.FacultyForm.getRawValue();

    if (this.active == undefined) {
      this.active = true;
    }
    const formData: FormData = new FormData();
    formData.append("FirstName", faculty.firstName)
    formData.append("LastName", faculty.lastName)
    formData.append("DisplayName", faculty.displayName)
    formData.append("ShortDescription", faculty.shortDescription)
    formData.append("LongDescription", faculty.longDescription)
    formData.append("Experience", faculty.experience)
    formData.append("CreatedBy", (localStorage.getItem("LoginId")));

    if (this.files.length == 1) {
      formData.append("fileupload", this.fileToUpload, this.name);
    }

    this._authService.AddFaculty(formData).subscribe((result: any) => {
      //debugger
      // var result = JSON.parse(result);
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
          this._router.navigate(['/faculty/facultydetails']);
        }, 1000);
      }
      else {
        // Set the alert
        this.alert = {
          type: 'error',
          message: result.message
        };

        // Show the alert
        this.showAlert = true;
      }
      (error) => {

      }
    });
  }

}
