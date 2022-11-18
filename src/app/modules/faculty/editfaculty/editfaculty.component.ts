import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-editfaculty',
  templateUrl: './editfaculty.component.html',
  styleUrls: ['./editfaculty.component.scss']
})

export class EditfacultyComponent implements OnInit {
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
  comparecount=1
  preview2: any;
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
  butdisabled: boolean;
  imageUrl: any;
  constructor(private _changeDetectorRef: ChangeDetectorRef,private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,) { }

  ngOnInit(): void {
    
    var loginId = localStorage.getItem("LoginId");
    var id = this.approute.snapshot.params['id'];
    var value = this.approute.snapshot.params['value'];

    this.FacultyForm = this._formBuilder.group({
      firstName : ['', [Validators.required]],
      lastName : ['', ],
      displayName : ['', ],
      shortDescription : ['', ],
      longDescription : ['',],
      experience : ['', ],
      imageUrl: ['', []],
    });
    this.Edit(id, value);
  }

  cancel() {
    this._router.navigate(['/faculty/facultydetails/']);
  }
  toggleDetails2()
    {
      var count =1
      if(count==this.comparecount){
      this.preview2=true;
      this.comparecount+=1;
    }
    else{
      this.preview2=false;
      this.comparecount-=1;

    }
      
      this._changeDetectorRef.markForCheck();
           
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
    //
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
      this.FacultyForm.controls['firstName'].disable();
      this.FacultyForm.controls['lastName'].disable();
      this.FacultyForm.controls['displayName'].disable();
      this.FacultyForm.controls['experience'].disable();
      this.FacultyForm.controls['shortDescription'].disable();
      this.FacultyForm.controls['longDescription'].disable();
      this.FacultyForm.controls['imageUrl'].disable();
      this.FacultyForm.controls['firstName'].disable();

    }
    else {
      this.butdisabled = false;
      this.FacultyForm.controls['firstName'].enable();
      this.FacultyForm.controls['lastName'].enable();
      this.FacultyForm.controls['displayName'].enable();
      this.FacultyForm.controls['experience'].enable();
      this.FacultyForm.controls['shortDescription'].enable();
      this.FacultyForm.controls['longDescription'].enable();
      this.FacultyForm.controls['imageUrl'].enable();
      this.FacultyForm.controls['firstName'].enable(); 

    }
    
    this._authService.GetFacultyById(id).subscribe((finalresult: any) => {
      
  
      if (finalresult.status == "200") {
        

        this.FacultyForm.patchValue(finalresult.result);
        if (finalresult.result.imageUrl != null) {
          this.imageUrl = finalresult.result.imageUrl;

        }

      }
     
    });
  }


  UpdateFaculty() {
    this.showAlert = false;
    
    if (this.FacultyForm.invalid) {
      return;
    }

    // Get the contact object
    const faculty = this.FacultyForm.getRawValue();

    const formData: FormData = new FormData();
    formData.append("FirstName", faculty.firstName)
    formData.append("LastName", faculty.lastName)
    formData.append("DisplayName", faculty.displayName)
    formData.append("ShortDescription", faculty.shortDescription)
    formData.append("LongDescription", faculty.longDescription)
    formData.append("Experience", faculty.experience)
    formData.append("UpdatedBy", (localStorage.getItem("LoginId")));
    formData.append("FacultyId", this.approute.snapshot.params['id']);

    if (this.files.length == 1) {
      formData.append("fileupload", this.fileToUpload, this.name);
    }
    else {
      formData.append("ImageUrl", faculty.imageUrl);

    }
    
    this._authService.UpdateFaculty(formData).subscribe((result: any) => {

      //
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

}
