import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
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
import { MatStepper } from '@angular/material/stepper';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { OrderByPipe } from '../order-by.pipe';
import { duration } from 'moment';
import moment from 'moment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { catchError, map, of } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

export interface coursecontentData {
  sno: number;
  chapter: string;
  author: string;
  contentType: string;
  preview: string;
  Actions: string;

}

export class Data {
  fileName: any
  materialId: any
  Url: any
  contentId: any

}

export class ProgressBar {
  progress: number;
}

@Component({
  selector: 'app-addcoursecontent',
  templateUrl: './addcoursecontent.component.html',
  styleUrls: ['./addcoursecontent.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddcoursecontentComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  
  color = 'primary';
  mode = 'indeterminate';
  Value = 50;
  displayProgressSpinner = false;
  spinnerWithoutBackdrop = false;
  
  FileNames: any
  progressBars: ProgressBar[] = [
    {
      progress: 0
    }
  ];
  myVideos = [];
  videoduration: any;
  sortedarray: any = [];
  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();

  @ViewChild('stepper') stepper: MatStepper;

  selectedProduct: any | null = null;
  displayedColumns = ['sno', 'sorting', 'chapter', 'actions'];
  dataSource: MatTableDataSource<coursecontentData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  active: boolean;

  coursecontentForm: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isLinear: boolean = false

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
  name: string = '';
  contentId: any;
  removeupload: boolean = false;
  remove: boolean = false;
  uploadedfilename: any;
  uploadedvideo: any;
  type: string;
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
      // ['bold', 'italic', 'underline'],
      // [{align: []}, {list: 'ordered'}, {list: 'bullet'}],
      // ['clean']
    ]
  };
  Moduleid: any;
  courseid: any;
  value: any;
  name1: string = null;
  files1: Array<any> = new Array<any>();
  fileToUpload1: File = null;
  format: string;
  uploadedNewFileName: string;
  newName: any;
  TotalParts: any;
  contents: any = [];
  modules: any;
  Modulename: any;
  Description: string = 'Hello';
  @ViewChild('myDialog', { read: TemplateRef }) myDialog: TemplateRef<any>;
  videoUrl: string = null;
  uploadvideo: boolean = true
  deletevideo: boolean = false
  fileslength: any;
  butdisabled: boolean = false;;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private approute: ActivatedRoute,
    private _fuseConfirmationService: FuseConfirmationService,
    private _changeDetectorRef: ChangeDetectorRef,
    private http: HttpClient,
    private _orderpipi: OrderByPipe,
    public dialog: MatDialog
    // public dialogRef: MatDialogRef<Description>
  ) { }

  ngOnInit(): void {
    debugger
    var loginId = localStorage.getItem("LoginId");
    // var Moduleid = this.approute.snapshot.params['moduleid'];
    var courseid = this.approute.snapshot.params['courseid'];
    var value = this.approute.snapshot.params['value'];
    // this.displayProgressSpinner = true;

    // this.GetTechnologys();
    // this.Moduleid = this.approute.snapshot.params['moduleid'];
    this.courseid = this.approute.snapshot.params['courseid'];
    this.value = this.approute.snapshot.params['value'];
    this.coursecontentForm = this._formBuilder.group({
      courseName: ['', [Validators.required]],
      moduleName: ['', []],
      author: ['', []],
      id: ['', []],
      chapter: ['', [Validators.required]],
      contentType: ['', []],
      uploadedfilename: ['', []],
      uploaded: ['', []],
      videoFileName: ['', []],
      videoUrl: ['', []],
      uploader: ['', []],
      uploader1: ['', []],
      contentDescription: ['', []],
      selectedmodule: ['', [Validators.required]]

    });

    this.GetModulesByCourseId();
    this.Edit(courseid, value);
    // this.Getgridcoursecontent(Moduleid);

  }
  ngAfterViewInit() {
    this.stepper.selectedIndex = 2;
  }

  ngOnDestroy() {
    localStorage.setItem('moduleid', null)
  }

  onSelectFile(files: FileList) {
    debugger
    if (files.length === 0)
      return;
    if (files.length > 0) {
      if(this.Save){
        this.files = [];
      }
      for (var i = 0; i < files.length; i++) {
        this.fileToUpload = files.item(i);
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(this.fileToUpload);
        this.name = this.fileToUpload.name.split(' ').join('-').replace(/[()]/g, "")
        this.uploadedfilename = ""
        this.FileNames = this.name
        this.FileNames += '<br>'
        this.files.push({ data: this.fileToUpload, fileName: this.fileToUpload.name });
      }

    }
    console.log('materialFile', files)
  }


  OnClickUp(id: any) {
    debugger
    let item1 = this.contents.find(i => i.sortOrderId === id);
    let item2 = this.contents.find(i => i.sortOrderId === (id - 1));
    if (item1.sortOrderId > 1) {
      item1.sortOrderId = item1.sortOrderId - 1
      item2.sortOrderId = item2.sortOrderId + 1
      this.sortedarray.push(item1);
      this.sortedarray.push(item2);

      this._authService.UpdateCourseContentOrderId(this.sortedarray).subscribe((result: any) => {
        debugger
        window.location.reload();
      });
    }
    else {
      return;
    }
  }

  OnClickDown(id: any) {
    debugger
    let item1 = this.contents.find(i => i.sortOrderId === id);
    let item2 = this.contents.find(i => i.sortOrderId === (id + 1));
    if (item1.sortOrderId < this.contents.length && item1.sortOrderId > 0) {
      item1.sortOrderId = item1.sortOrderId + 1
      item2.sortOrderId = item2.sortOrderId - 1
      this.sortedarray.push(item1);
      this.sortedarray.push(item2);

      this._authService.UpdateCourseContentOrderId(this.sortedarray).subscribe((result: any) => {
        debugger
        window.location.reload();
      });
    }
    else {
      return;
    }
  }

  BackButton() {

  }


  updateInfos() {
    var infos = document.getElementById('infos');
    infos.textContent = "";
    for (var i = 0; i < this.myVideos.length; i++) {
      infos.textContent += this.myVideos[i].name + " duration: " + this.myVideos[i].duration + '\n';
    }
  }

  GetVideoDuration(files) {

    var resultstring;
    window.URL = window.URL || window.webkitURL;

    this.myVideos.push(files.target.files[0]);
    var video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src);
      var SECONDS_COUNT = video.duration
      const duration = moment.duration(SECONDS_COUNT, 'seconds');
      resultstring = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
      localStorage.setItem('videoduration', resultstring);
      // duration=duration1;
      //  this.videoduration = video.duration;
      // this.myVideos[this.myVideos.length - 1].duration = duration;
      // this.updateInfos();
    }
    video.src = URL.createObjectURL(files.target.files[0]);
  }


  onSelectVideo(files) {
    debugger
    this.GetVideoDuration(files);
    // var val=localStorage.getItem('videoduration');

    if (files.target.files.length === 0)
      return;
    if (files.target.files.length > 0) {
      this.files1 = [];
      for (var i = 0; i < files.target.files.length; i++) {
        this.fileToUpload1 = files.target.files.item(i);
        const fileReader: FileReader = new FileReader();
        fileReader.readAsDataURL(this.fileToUpload1);
        this.name1 = this.fileToUpload1.name.split(' ').join('-').replace(/[()]/g, "")
        this.uploadedvideo = ""
        this.files1.push({ data: this.fileToUpload1, fileName: this.fileToUpload1.name });
      }

    }

  }

  Getgridcoursecontent(id: any,) {
    debugger
    this.Id = id;
    this._authService.gridcoursecontentbycourseid(this.Id).subscribe((finalresult: any) => {
      debugger
      // var finalresult = JSON.parse(finalresult);
      if (finalresult.status == "200") {
        console.log(finalresult.result)
        var values = this._orderpipi.transform(finalresult.result, "asc", "sortOrderId", "number");
        this.contents = values[0]
        this.dataSource = new MatTableDataSource(values[0]);
        // console.log('techs',this.dataSource)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
      else {

      }
    });
  }

  selectionChange(event: StepperSelectionEvent) {
    debugger
    var value = "edit"
    console.log(event.selectedStep.label);
    let stepLabel = event.selectedStep.label
    if (stepLabel == "Step 1") {
      this._router.navigate(['/courses/editcourse/' + this.courseid + '/' + 'edit']);
    }
    if (stepLabel == "Step 2") {
      this._router.navigate(['/courses/addcoursemodule/' + this.courseid]);

    }
    if (stepLabel == "Step 4") {
      this._router.navigate(['/courses/questions/' + this.courseid]);
    }
    if (stepLabel == "Step 5") {
      this._router.navigate(['/courses/reviews/' + this.courseid]);
    }
    // if (stepLabel == "Step 6") {
    //   this._router.navigate(['/courses/subscriptions/'+this.courseid]);
    // }
  }

  GoToFaq() {
    this._router.navigate(['/courses/questions/' + this.courseid]);
  }

  GoToReviews() {
    this._router.navigate(['/courses/reviews/' + this.courseid]);

  }
  GoToSubscriptions() {
    this._router.navigate(['/courses/subscriptions/' + this.courseid]);

  }

  GoToPage() {
    debugger
    this._router.navigate(['/courses/editcourse/' + this.courseid + '/' + 'edit']);

  }
  GoToPage1() {
    debugger
    this._router.navigate(['/courses/addcoursemodule/' + this.courseid]);

  }
  cancel() {

    this._router.navigate(['/courses/course']);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 10);

  }

  DeleteMaterial(row: any) {
    debugger
    var filename = row.Url.replace('https://ugetit.blob.core.windows.net/coursecontentfiles/', "")
    var data = {
      MaterialId: row.materialId,
      MaterialFileName: filename,
      UpdatedBy: parseInt(localStorage.getItem("LoginId")),
      FolderName: 'coursecontentfiles'
    }
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete File ',
      message: 'Are you sure you want to delete this File?',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });

    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {

      // If the confirm button pressed...
      if (result === 'confirmed') {

        // Delete the video
        this._authService.DeleteFiles(data).subscribe((finalresult: any) => {
          debugger
          if (finalresult.status == "200") {
            let index = this.files.findIndex((element) => element["materialId"] == row.materialId);

            this.files.splice(index, 1)
            this.alert = {
              type: 'success',
              message: finalresult.message
            };

            // Show the alert
            this.showAlert = true;

            setTimeout(() => {
              this.showAlert = false;

            }, 3000);
          }
        })

      }
    });

  }

  DeleteVideo() {
    debugger
    var filename = this.videoUrl.replace('https://ugetit.blob.core.windows.net/coursevideos/', "")

    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete Video',
      message: 'Are you sure you want to delete this Video?',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });

    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {

      // If the confirm button pressed...
      if (result === 'confirmed') {

        // Delete the video
        this._authService.DeleteChapterVideo(filename).subscribe((finalresult: any) => {
          debugger
          if (finalresult.status == "200") {
            this.uploadvideo = true
            this.deletevideo = false
            this.videoUrl = null
            this.name1 = null
            this.files1 = []
            this.fileToUpload = null
            this.alert = {
              type: 'success',
              message: finalresult.message
            };

            // Show the alert
            this.showAlert = true;

            setTimeout(() => {
              this.showAlert = false;

            }, 3000);
          }
        })

      }
    });

  }


  UploadVideo(value: any) {
    debugger
    const formData: FormData = new FormData();
    if (value == 'save' || value == 'SaveNext') {
      if (this.files1.length >= 1) {
        formData.append("files", this.fileToUpload1, this.name1);
         //  this._authService.UploadChapterVideo(formData).pipe(map(events=>{
        //     switch(events.type){
        //       case HttpEventType.UploadProgress:
        //         this.progress=Math.round(events.loaded / events.total! * 100);
        //         break;
        //         case HttpEventType.Response:
        //           this.uploadvideo = false
        //           this.deletevideo = true
        //           this.AddCoursecontent(value);
        //            setTimeout(() => {
        //             this.progress = 0;
        //            }, 3000);
        //            //this.videoUrl = finalresult.result
        //     }
        //   }),
        //   catchError((error:HttpErrorResponse)=>{
        //     //show alert
        //     return of("failed")
        //   })
        //   )
           this.blockUI.start('Uploading...');

        this._authService.UploadChapterVideo(formData)
          .subscribe((finalresult: any) => {
          debugger
          this.uploadvideo = false
          this.deletevideo = true
          this.videoUrl = finalresult.result
          this.AddCoursecontent(value);
          
          //catchError((error:HttpErrorResponse)=>{
            //show alert
            //return of("failed")
          //}
          // this._authService.UploadChapterVideo(formData).subscribe({
          // next: (event) => {

          //   if (event.type === HttpEventType.UploadProgress){
          //     this.progress = Math.round(100 * event.loaded / event.total)
          //     const val=new ProgressBar()
          //     val.progress=this.progress
          //     this.progressBars.push(val)
          //     console.log('progress',this.progressBars)
          //   //   setInterval(() => { 
          //   // this.progressBars.forEach(b => this.updateProgressBar(b, this.progress))
          //   // }, 500)
          // }
          //   else if (event.type === HttpEventType.Response) {
          //   debugger
          //   this.uploadvideo=false
          //   this.deletevideo=true
          //  this.videoUrl= finalresult.result
          // this.AddCoursecontent();
          // let Body=JSON.stringify(event.body)
          // this.videoUrl= (JSON.parse(Body)).result
          // this.alert = {
          //   type: 'success',
          //   message:'Upload success.'
          // };
          // this.message = 'Upload success.';
          // this.showAlert = true;

          // setTimeout(() => {
          //   this.showAlert = false;

          // }, 3000);


          //   this.onUploadFinished.emit(event.body);

          // }
          //}
          // if(finalresult.status=="200"){
          //   this.uploadvideo=false
          //   this.deletevideo=true
          //   this.videoUrl=finalresult.result
          //   this.alert = {
          //     type: 'success',
          //     message:finalresult.message
          //   };

          //   // Show the alert
          //   this.showAlert = true;

          //   setTimeout(() => {
          //     this.showAlert = false;

          //   }, 3000);
          // }
        })
      }
      else {
        this.AddCoursecontent(value);
      }
    }
    else if (value == 'update' || value == 'UpdateNext') {
      if (this.files1.length >= 1) {
        formData.append("files", this.fileToUpload1, this.name1);
        
        this.blockUI.start('Uploading...');
        this._authService.UploadChapterVideo(formData).subscribe((finalresult: any) => {
          debugger
          this.uploadvideo = false
          this.deletevideo = true
          this.videoUrl = finalresult.result
          this.UpdateCoursecontent(value);
          // this._authService.UploadChapterVideo(formData).subscribe({
          // next: (event) => {

          //   if (event.type === HttpEventType.UploadProgress){
          //     this.progress = Math.round(100 * event.loaded / event.total)
          //     const val=new ProgressBar()
          //     val.progress=this.progress
          //     this.progressBars.push(val)
          //     console.log('progress',this.progressBars)
          //   //   setInterval(() => { 
          //   // this.progressBars.forEach(b => this.updateProgressBar(b, this.progress))
          //   // }, 500)
          // }
          //   else if (event.type === HttpEventType.Response) {
          //   debugger
          //   this.uploadvideo=false
          //   this.deletevideo=true
          //  this.videoUrl= finalresult.result
          // this.UpdateCoursecontent();
          // let Body=JSON.stringify(event.body)
          // this.videoUrl= (JSON.parse(Body)).result
          // this.alert = {
          //   type: 'success',
          //   message:'Upload success.'
          // };
          // this.message = 'Upload success.';
          // this.showAlert = true;

          // setTimeout(() => {
          //   this.showAlert = false;

          // }, 3000);


          //   this.onUploadFinished.emit(event.body);

          // }
          //}
          // if(finalresult.status=="200"){
          //   this.uploadvideo=false
          //   this.deletevideo=true
          //   this.videoUrl=finalresult.result
          //   this.alert = {
          //     type: 'success',
          //     message:finalresult.message
          //   };

          //   // Show the alert
          //   this.showAlert = true;

          //   setTimeout(() => {
          //     this.showAlert = false;

          //   }, 3000);
          // }
        })
      }
      else {
        this.UpdateCoursecontent(value);
      }
    }
    else {

    }

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
      this.coursecontentForm.controls['moduleName'].disable();

      // this.coursecontentForm.controls['technologyId'].disable();
      // this.coursecontentForm.controls['description'].disable();
      // this.coursecontentForm.controls['title'].disable();



    }
    else {
      this.coursecontentForm.controls['courseName'].enable();
      this.coursecontentForm.controls['moduleName'].enable();

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

      }
      else {

      }
    });

    // this._authService.GetCourseModulesById(moduleid).subscribe((finalresult: any) => {
    //   debugger
    //   console.log(finalresult);
    //   //  var finalresult = JSON.parse(finalresult);
    //   // rolebyid=finalresult;
    //   if (finalresult.status == "200") {
    //     //debugger
    //     this.coursecontentForm.controls['moduleName'].setValue(finalresult.result.moduleName)
    //     this.coursecontentForm.patchValue(finalresult.result);
    //     const course = this.coursecontentForm.getRawValue();

    //   }

    // });
  }

  applyFilter(filterValue: string) {
    //debugger
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectedmodule() {
    debugger
    this.clear();
    var id = this.coursecontentForm.controls['selectedmodule'].value;
    var item = this.modules.find(x => x.moduleId == id);
    this.Modulename = item.moduleName
    this.Getgridcoursecontent(id);
  }

  GetModulesByCourseId() {

    this._authService.GetCourseModules(this.courseid).subscribe((finalresult: any) => {
      debugger
      var finalresult = JSON.parse(finalresult);
      var values = this._orderpipi.transform(finalresult.result, "asc", "orderId", "number");
      this.modules = values[0];
      var aa = localStorage.getItem('moduleid');
      if (localStorage.getItem('moduleid') == "null") {
        this.coursecontentForm.controls['selectedmodule'].setValue(this.modules[0].moduleId)
        this.Modulename = this.modules[0].moduleName

      }
      else {
        this.coursecontentForm.controls['selectedmodule'].setValue(parseInt(localStorage.getItem('moduleid')))
        var name = this.modules.find(x => x.moduleId == parseInt(localStorage.getItem('moduleid')))
        this.Modulename = name.moduleName
      }
      this.Getgridcoursecontent(this.coursecontentForm.controls['selectedmodule'].value);
      // if (finalresult.status == "200") {
      //   this.dataSource = new MatTableDataSource(values[0]);
      // }
    })
  }

  contentchange() {
    debugger
    const coursecont = this.coursecontentForm.getRawValue();
    if (coursecont.contentType == "Video") {
      this.type = 'video/*';
    }
    else {
      this.type = '.doc';
    }

  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

  AddCoursecontent(val: any) {
    debugger
    this.showAlert = false;
    // this.openDialogWithTemplateRef(this.myDialog);
    // if(this.files1.length<1 ||this.files.length<1){
    //   this.alert = {
    //     type: 'error',
    //     message: "Selecting file is mandatory"
    //   };

    //   // Show the alert
    //   this.showAlert = true;
    //   setTimeout(() => {
    //     this.showAlert = false;
    //   }, 1500);
    //   return;
    // }
    localStorage.setItem('moduleid', this.coursecontentForm.controls['selectedmodule'].value)
    if (this.coursecontentForm.invalid) {

      this.alert = {
        type: 'error',
        message: "Enter All Mandatory Fields"
      };

      // Show the alert
      this.showAlert = true;


      setTimeout(() => {
        this.showAlert = false;
      }, 1500);
      return;

    }

    // Get the contact object
    const coursecont = this.coursecontentForm.getRawValue();

    var LoginId = localStorage.getItem("LoginId");
    var Loginid = JSON.parse(LoginId);
    const formData: FormData = new FormData();
    if (this.files.length > 0) {
      for (let i = 0; i < this.files.length; i++) {
        formData.append("fileupload" + (i + 1).toString(), this.files[i].data, this.files[i].fileName);
      }
    }
    //   if (this.fileToUpload1!=null) {
    //     formData.append("fileupload1", this.fileToUpload1, this.fileToUpload1.name);
    // }
    formData.append("CourseId", this.approute.snapshot.params['courseid'])
    formData.append("ModuleId", this.coursecontentForm.controls['selectedmodule'].value)
    formData.append("Chapter", coursecont.chapter)
    formData.append("Author", coursecont.author)
    formData.append("ContentType", coursecont.contentType)
    formData.append("VideoDuration", localStorage.getItem('videoduration'))
    formData.append("ContentDescription", coursecont.contentDescription)
    formData.append("CreatedBy", Loginid);
    formData.append("VideoUrl", this.videoUrl)
    formData.append("VideoFileName", this.name1)
    this.blockUI.start('Saving...')
    this._authService.Addcoursecontent(formData).subscribe((result: any) => {
      debugger

      // var result = JSON.parse(result);
      if (result.status == "200") {
        //debugger
        this.dialog.closeAll();

        // Set the alert
        this.alert = {
          type: 'success',
          message: result.message
        };

        // Show the alert
        this.showAlert = true;
        if (val == 'save') {
          setTimeout(() => {
            // this._router.navigate(['/courses/course']);
            this.blockUI.stop();
            window.location.reload();
            var modulerow = this.modules.find(x => x.moduleId == localStorage.getItem('moduleid'))
            
          }, 3000);
        }
        else if (val == 'SaveNext') {
          debugger
          setTimeout(() => {
            this.blockUI.stop();
            this._router.navigate(['/courses/questions/' + this.courseid]);
          }, 3000);
        }

        //   this.coursecontentForm.controls['selectedmodule'].setValue(modulerow.moduleId)
        // this.Getgridcoursecontent(this.coursecontentForm.controls['selectedmodule'].value);
        // this.Modulename=modulerow.moduleName
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
          this.blockUI.stop();
          this.showAlert = false;

        }, 3000);

      }
      (error) => {
        debugger
        this.alert = {
          type: 'warn',
          message: "Error While Saving Data"
        };

        // Show the alert
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
          this.blockUI.stop();
        }, 3000);
      }
    });
  }

  removeuploads() {
    this.removeupload = true;
    this.uploadedfilename = '';

  }

  UpdateCoursecontent(val: any) {
    debugger
    this.showAlert = false;

    if (this.coursecontentForm.invalid) {

      this.alert = {
        type: 'error',
        message: "Enter mandatory Fields"
      };

      // Show the alert
      this.showAlert = true;

      setTimeout(() => {
        this.showAlert = false;
      }, 1500);
      return;

    }
    // Get the contact object
    const coursecont = this.coursecontentForm.getRawValue();


    const formData: FormData = new FormData();
    formData.append("Id", coursecont.id)
    formData.append("CourseId", this.approute.snapshot.params['courseid'])
    formData.append("ModuleId", this.coursecontentForm.controls['selectedmodule'].value)
    formData.append("Chapter", coursecont.chapter)
    formData.append("Author", coursecont.author)
    formData.append("ContentType", coursecont.contentType)
    formData.append("VideoDuration", localStorage.getItem('videoduration'))
    formData.append("ContentDescription", coursecont.contentDescription)
    formData.append("UpdatedBy", (localStorage.getItem("LoginId")));
    formData.append("VideoUrl", this.videoUrl)
    formData.append("VideoFileName", this.name1)
    formData.append("length", this.fileslength)

    if (this.files.length > 0) {
      for (let i = this.fileslength; i < this.files.length; i++) {
        formData.append("fileupload" + (i + 1).toString(), this.files[i].data, this.files[i].fileName);
      }
    }
  
    // if (this.files1.length == 1) {
    //   formData.append("fileupload1", this.fileToUpload1, this.name1);
    // }
    // else if (this.removeupload==false) {
    //   formData.append("VideoFileName", coursecont.videoFileName)
    //   formData.append("VideoUrl", coursecont.videoUrl)
    // }
    // else if (this.removeupload==false) {
    //   formData.append("Uploadedfilename", coursecont.uploadedfilename)
    //   formData.append("Uploaded", coursecont.uploaded)
    // }

    this._authService.Updatecoursecontent(formData).subscribe((result: any) => {
      debugger
      var result = JSON.parse(result);
      if (result.status == "200") {
        //  this.videoUpload();
        //debugger
        // Set the alert
        this.alert = {
          type: 'success',
          message: result.message
        };

        // Show the alert
        this.showAlert = true;
        if (val == 'update') {
          setTimeout(() => {
            // this._router.navigate(['/courses/coursecontent']);
            window.location.reload();
          }, 3000);
        }
        else if (val == 'UpdateNext') {
          setTimeout(() => {
            this._router.navigate(['/courses/questions/' + this.courseid]);
          }, 1000);
        }
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

  uploadFile1(value) {
    this.newName = this.generateUUID();
    this.uploadedNewFileName = '';
    this.UploadFile(value);

  }
  generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16;//random number between 0 and 16
      if (d > 0) {//Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {//Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  UploadFile(TargetFile) {
    this.TotalParts;
    var file = TargetFile[0];
    debugger;
    // document.getElementById('videoupload').innerHTML = file.name
    var newFileName = this.newName + file.name;
    this.uploadedNewFileName = newFileName
    console.log('TargetFile', TargetFile)
    // create array to store the buffer chunks
    var FileChunk = [];
    // the file object itself that we will work with
    var file = TargetFile[0];
    // set up other initial vars
    var MaxFileSizeMB = 1;
    var BufferChunkSize = MaxFileSizeMB * (1024 * 1024);
    var ReadBuffer_Size = 1024;
    var FileStreamPos = 0;
    // set the initial chunk length
    var EndPos = BufferChunkSize;
    var Size = file.size;

    // add to the FileChunk array until we get to the end of the file
    while (FileStreamPos < Size) {
      // "slice" the file from the starting position/offset, to  the required length
      FileChunk.push(file.slice(FileStreamPos, EndPos));
      FileStreamPos = EndPos; // jump by the amount read
      EndPos = FileStreamPos + BufferChunkSize; // set next chunk length
    }
    // get total number of "files" we will be sending
    this.TotalParts = FileChunk.length;
    console.log(this.TotalParts)
    var PartCount = 0;
    // loop through, pulling the first item from the array each time and sending it
    // while (chunk = FileChunk.shift()) {
    // PartCount++;
    // file name convention
    // var FilePartName = newFileName + ".part_" + PartCount + "." + this.TotalParts;
    // send the file
    // this.UploadFileChunk(chunk, FilePartName);
    // }
  }

  UploadFileChunk(Chunk, FileName) {
    var count = 0

    // construct the form data and apply new file name
    var FD = new FormData();
    FD.append('file', Chunk, FileName);
    this._authService.Updatecoursecontentvideo(FD).subscribe((result: any) => {
      debugger
      count++;
      console.log('TotalParts', this.TotalParts)
      console.log('count', count)
      if (this.TotalParts == count) {
        alert('Video uploaded!!');
        count = 0;
      }
    });

  }

  public uploadFile = (files) => {
    debugger
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:44358/api/Admin/Updatecoursecontentvideo', formData, { reportProgress: true, observe: 'events' })
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
          }
        },
        // error: (err: HttpErrorResponse) => console.log(err)
      );
  }

  videoUpload() {
    debugger
    const data: FormData = new FormData();

    if (this.files1.length == 1) {
      data.append("fileupload", this.fileToUpload1, this.name1);
    }
    this._authService.Updatecoursecontentvideo(data).subscribe((result: any) => {
      debugger
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
    var value = "editcontent"
    this._router.navigate(['/courses/addcoursecontent/' + id + '/' + value])
  }
  clear() {
    this.coursecontentForm.controls['contentType'].setValue('');
    this.coursecontentForm.controls['contentDescription'].setValue('');
    this.coursecontentForm.controls['author'].setValue('');
    this.coursecontentForm.controls['chapter'].setValue('');
    this.uploadedfilename = ''
    this.uploadedvideo = ''
    this.name = '';
    this.name1 = ''
    this.files = []
    this.files1 = []
    this.Save = true;
    this.update = false;

  }
  EditFromGrid(id: any, value: any) {
    debugger
    this.value = value
    var baseurl = this._authService.baseUrl;
    if (baseurl == "https://localhost:44358/") {
      baseurl = "https://localhost:44358"
    }
    if (baseurl == "http://testugetitapi.fadelsoft.com/") {
      baseurl = "http://testugetitapi.fadelsoft.com"
    }
    if (value == "viewcontent") {
      this.butdisabled = true;
      this.coursecontentForm.controls['courseName'].disable();
      this.coursecontentForm.controls['author'].disable();
      this.coursecontentForm.controls['chapter'].disable();
      this.coursecontentForm.controls['contentType'].disable();
      this.coursecontentForm.controls['contentDescription'].disable();
     
      this.Save = true;
      this.update = false;
      this.Clear = false;
    }
    else {
      this.butdisabled = false;
      this.coursecontentForm.controls['courseName'].disable();
      this.coursecontentForm.controls['author'].enable();
      this.coursecontentForm.controls['chapter'].enable();
      this.coursecontentForm.controls['contentType'].enable();
      this.coursecontentForm.controls['contentDescription'].enable();
     

      this.Save = false;
      this.update = true;
      this.Clear = true;
    }
    this.Id = id;
    this._authService.GetcoursecontentById(this.Id).subscribe((finalresult: any) => {
      debugger
      console.log(finalresult);
      //  var finalresult = JSON.parse(result);
      // rolebyid=finalresult;
      if (finalresult.status == "200") {
        debugger
        this.coursecontentForm.patchValue(finalresult.result);
        const course = this.coursecontentForm.getRawValue();
        console.log('coursecontent', course)
        this.contentId = course.id;
        this.fileslength=finalresult.result.files.length
        this.uploadedfilename = course.uploadedfilename;
        this.uploadedvideo = course.videoFileName;
        if (finalresult.result.videoUrl != null && finalresult.result.videoUrl != "" && finalresult.result.videoUrl != "null") {

          this.videoUrl = finalresult.result.videoUrl
          this.name1 = finalresult.result.videoFileName
          this.uploadvideo = false
          this.deletevideo = true
        }
        else {
          this.uploadvideo = true
          this.deletevideo = false
        }
        this.files = []
        finalresult.result.files.forEach(element => {
          const values = new Data();
          values.Url = element.materialFileUrl
          values.contentId = element.courseContentId
          values.fileName = element.materialFileName
          values.materialId = element.materialId
          this.files.push(values)
        });

      }
      else {

      }
    });
  }
  deleteFromGrid(id: any): void {
    debugger
    this.showAlert = false
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete course',
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
      if (result === 'confirmed') {
        var CreatedBy = parseInt(localStorage.getItem("LoginId"))
        var data = {
          Id: id
        }
        // Delete the contact
        this._authService.deletecoursecontent(data).subscribe((data: any) => {
          //debugger
          if (data.status == "200") {


            this.alert = {
              type: 'success',
              message: data.message

            };
            this.showAlert = true
            //  this._router.navigate(['/userconfig/role/']);
            setTimeout(() => {
              window.location.reload();
            }, 0);

          }
          else {
            this.alert = {
              type: 'error',
              message: data.message

            };
            this.showAlert = true
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
