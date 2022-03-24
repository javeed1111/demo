import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { MatInputModule } from '@angular/material/input'
import { fuseAnimations } from '@fuse/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FuseConfirmationService } from '@fuse/services/confirmation';
export interface coursecontentData {
  sno: number;
  chapter: string;
  author: string;
  contentType: string;
  preview: string;
  Actions: string;
  
}

@Component({
  selector: 'app-addcoursecontent',
  templateUrl: './addcoursecontent.component.html',
  styleUrls: ['./addcoursecontent.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddcoursecontentComponent implements OnInit {
  selectedProduct: any | null = null;
  displayedColumns = ['sno','chapter','author','contentType', 'preview', 'actions'];
  dataSource: MatTableDataSource<coursecontentData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  active: boolean;
  coursecontentForm: FormGroup;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;
  showAlert1: boolean = false;
  Clear: boolean = false;
  Save: boolean = true;
  update: boolean = false;
  Id: any;
  technology: any;
  technologyId
  files: Array<any> = new Array<any>();
  fileToUpload: File = null;
  name: string;
  contentId: any;



  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,
    private _fuseConfirmationService: FuseConfirmationService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    var loginId = localStorage.getItem("LoginId");
    var id = this.approute.snapshot.params['id'];
    var value = this.approute.snapshot.params['value'];
    // this.GetTechnologys();
    this.coursecontentForm = this._formBuilder.group({
      courseName: ['', [Validators.required]],
      author: ['', []],
      id: ['', []],
      chapter: ['', []],
      contentType: ['', []],
      uploadedfilename         :['', []],
      // Duration     :['', [Validators.required]],
      
      // units        :['', []],
      // userchkactive: ['']

    });
    this.Edit(id, value);
    this.Getgridcoursecontent(id);
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
      }
    }
  }
  // GetTechnologys() {
  //   //debugger
  //   this._authService.GetTechnologies().subscribe((finalresult: any) => {
  //     //debugger
  //     var finalresult = JSON.parse(finalresult);
  //     if (finalresult.status == "200") {
  //       //debugger
  //       //this.dataSource= finalresult.result;
  //       this.technology = finalresult.result;
  //       //this.roles = finalresult.result;
  //       console.log('techs', this.technology)
  //       //const dataSource = this.roles ;
  //     }
  //     else {

  //     }
  //   });
  // }
  Getgridcoursecontent(id: any,) {
    debugger
    this.Id = id;
    this._authService.gridcoursecontentbycourseid(this.Id).subscribe((finalresult: any) => {
      debugger
      // var finalresult = JSON.parse(finalresult);
      if (finalresult.status == "200") {
        console.log(finalresult.result)
        this.dataSource = new MatTableDataSource(finalresult.result);
        // console.log('techs',this.dataSource)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {

      }
    });
  }

  cancel() {
    this._router.navigate(['/courses/coursecontent/']);
    setTimeout(() => {
      window.location.reload();
    }, 10);

  }
  Edit(id: any, value: any) {
    //debugger
    var baseurl = this._authService.baseUrl;
    if (baseurl == "https://localhost:44358/") {
      baseurl = "https://localhost:44358"
    }
    if (baseurl == "http://testugetitapi.fadelsoft.com/") {
      baseurl = "http://testugetitapi.fadelsoft.com"
    }
    if (value == "add") {
      this.coursecontentForm.controls['courseName'].disable();
      // this.coursecontentForm.controls['technologyId'].disable();
      // this.coursecontentForm.controls['description'].disable();
      // this.coursecontentForm.controls['title'].disable();



    }
    else {
      this.coursecontentForm.controls['courseName'].enable();
      
      // this.coursecontentForm.controls['technologyId'].enable();
      // this.coursecontentForm.controls['description'].enable();
      // this.coursecontentForm.controls['title'].enable();

    }
    this.Id = id;
    this._authService.GetcourseById(this.Id).subscribe((finalresult: any) => {
      //debugger
      console.log(finalresult);
      //  var finalresult = JSON.parse(result);
      // rolebyid=finalresult;
      if (finalresult.status == "200") {
        //debugger

        this.coursecontentForm.patchValue(finalresult.result);
        const course = this.coursecontentForm.getRawValue();
        // if (course.duration == 0) {
        //   this.courseForm.controls['duration'].setValue("")
        // }
        // if (course.fees == 0) {
        //   this.courseForm.controls['fees'].setValue("")
        // }
        // if (finalresult.result.imageURL != null) {
        //   this.ImageURL = baseurl + finalresult.result.imageURL;

        // }
        // else {

        // }

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
  
  applyFilter(filterValue: string) {
    //debugger
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  AddCoursecontent() {
    debugger
    this.showAlert = false;
    if (this.coursecontentForm.invalid) {
      return;
    }
    // Get the contact object
    const coursecont = this.coursecontentForm.getRawValue();

    // Go through the contact object and clear empty values
    //  contact.emails = contact.emails.filter(email => email.email);

    //  contact.phoneNumbers = contact.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

    //   if(this.active==undefined){
    //      this.active = true;
    //  }
    //  if(course.Duration==""){
    //    course.Duration=0
    //     }
    //     if(course.Fees==""){
    //       course.Fees=0
    //     }
    const formData: FormData = new FormData();
    formData.append("CourseId",  this.approute.snapshot.params['id'])
    formData.append("Chapter", coursecont.chapter)
    formData.append("Author", coursecont.author)
    formData.append("ContentType", coursecont.contentType)
    formData.append("CreatedBy", (localStorage.getItem("LoginId")));
    if (this.files.length == 1) {
      formData.append("fileupload", this.fileToUpload, this.name);
    }
    this._authService.Addcoursecontent(formData).subscribe((result: any) => {
      //debugger
      var result = JSON.parse(result);
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
          this._router.navigate(['/courses/coursecontent']);
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
  UpdateCoursecontent(){
    debugger
    this.showAlert = false;
    if (this.coursecontentForm.invalid) {
      return;
    }
    // Get the contact object
    const coursecont = this.coursecontentForm.getRawValue();

    // Go through the contact object and clear empty values
    //  contact.emails = contact.emails.filter(email => email.email);

    //  contact.phoneNumbers = contact.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

    //   if(this.active==undefined){
    //      this.active = true;
    //  }
    //  if(course.Duration==""){
    //    course.Duration=0
    //     }
    //     if(course.Fees==""){
    //       course.Fees=0
    //     }
    const formData: FormData = new FormData();
    formData.append("Id",  coursecont.id)
    formData.append("CourseId",  this.approute.snapshot.params['id'])
    formData.append("Chapter", coursecont.chapter)
    formData.append("Author", coursecont.author)
    formData.append("ContentType", coursecont.contentType)
    formData.append("UpdatedBy", (localStorage.getItem("LoginId")));
    if (this.files.length == 1) {
      formData.append("fileupload", this.fileToUpload, this.name);
    }
    this._authService.Updatecoursecontent(formData).subscribe((result: any) => {
      //debugger
      var result = JSON.parse(result);
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
          this._router.navigate(['/courses/coursecontent']);
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
  toggleCompleted($event: MatSlideToggleChange): void {
    //debugger
    if ($event.checked != undefined) {
      this.active = $event.checked;
    }
    else {
      this.active = true;
    }
    //this.active=this.filters.hideCompleted$.next(change.checked);
  }
  showEditModal(id) {
    //debugger
    var value="editcontent"
    this._router.navigate(['/courses/addcoursecontent/'+id+'/'+value])
  }
  clear(){
    this.coursecontentForm.controls['contentType'].setValue('');
    // this.coursecontentForm.controls['courseName'].setValue('');
      this.coursecontentForm.controls['author'].setValue('');
      this.coursecontentForm.controls['chapter'].setValue('');

  }
  EditFromGrid(id: any,value: any) {
    debugger
    var baseurl = this._authService.baseUrl;
    if (baseurl == "https://localhost:44358/") {
      baseurl = "https://localhost:44358"
    }
    if (baseurl == "http://testugetitapi.fadelsoft.com/") {
      baseurl = "http://testugetitapi.fadelsoft.com"
    }
    if (value == "viewcontent") {
      this.coursecontentForm.controls['courseName'].disable();
      this.coursecontentForm.controls['author'].disable();
      this.coursecontentForm.controls['chapter'].disable();
      this.coursecontentForm.controls['contentType'].disable();
      this.Save=true;
      this.update=false;
      this.Clear=false;
    }
    else {
      this.coursecontentForm.controls['courseName'].disable();
      this.coursecontentForm.controls['author'].enable();
      this.coursecontentForm.controls['chapter'].enable();
      this.coursecontentForm.controls['contentType'].enable();
      this.Save=false;
      this.update=true;
      this.Clear=true;
    }
    this.Id = id;
    this._authService.GetcoursecontentById(this.Id).subscribe((finalresult: any) => {
      //debugger
      console.log(finalresult);
      //  var finalresult = JSON.parse(result);
      // rolebyid=finalresult;
      if (finalresult.status == "200") {
        //debugger

        this.coursecontentForm.patchValue(finalresult.result);
        const course = this.coursecontentForm.getRawValue();
        console.log('coursecontent',course)
        this.contentId=course.id;
        // if (course.duration == 0) {
        //   this.courseForm.controls['duration'].setValue("")
        // }
        // if (course.fees == 0) {
        //   this.courseForm.controls['fees'].setValue("")
        // }
        // if (finalresult.result.imageURL != null) {
        //   this.ImageURL = baseurl + finalresult.result.imageURL;

        // }
        // else {

        // }

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
  deleteFromGrid(id:any): void
    {
      //debugger
      this.showAlert=false
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete course',
            message: 'Are you sure you want to delete this CourseContent?',
            actions: {
                confirm: {
                    label: 'Delete'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if ( result === 'confirmed' )
            {
           var CreatedBy= parseInt(localStorage.getItem("LoginId"))

                // Delete the contact
                this._authService.deletecoursecontent(id).subscribe((data:any) => {
                    //debugger
                    if (data.status == "200") {
                        
                          
                        this.alert = {
                            type   : 'success',
                            message: data.message
                        
                        };
                        this.showAlert=true
                      //  this._router.navigate(['/userconfig/role/']);
                        setTimeout(() => {
                            window.location.reload();
                        }, 0);
                        
                      }
                      else {
                        this.alert = {
                          type   : 'error',
                          message: data.message
                      
                      };
                      this.showAlert=true
                        // this.notifications.alert('Alert', result.message, NotificationType.Alert, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false });
                      }

                        // Return if the contact wasn't deleted...
                        // if ( !isDeleted )
                        // {
                        //     return;
                        // }

                        // // Navigate to the next contact if available
                        // if ( nextContactId )
                        // {
                        //     this._router.navigate(['../', nextContactId], {relativeTo: this._activatedRoute});
                        // }
                        // // Otherwise, navigate to the parent
                        // else
                        // {
                        //     this._router.navigate(['../'], {relativeTo: this._activatedRoute});
                        // }

                        // Toggle the edit mode off
                        // this.toggleEditMode(false);
                    });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });

    }

}
