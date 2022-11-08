import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
// import {MatPaginator} from '@angular/material/paginator';
// import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'app/core/auth/auth.service';
// import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { FuseAlertType } from '@fuse/components/alert';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
// import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
export interface CourseData {
  sno: string;
  courseName: string;
  technologyName: string;
  title: string;
  Actions: string;
}
@Component({
  selector: 'app-course-module',
  templateUrl: './course-module.component.html',
  styleUrls: ['./course-module.component.scss']
})
export class CourseModuleComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  isLoading: boolean = false;
  selectedProduct: any | null = null;
  displayedColumns = ['sno',  'title','actions'];
  dataSource: MatTableDataSource<CourseData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // pagination: VenturePagination;
  // dataSource: MatTableDataSource<CourseData>;
  searchInputControl: FormControl = new FormControl();
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  roles: any;
  role: any;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
};
showAlert:  boolean = false;
course: any;
  courseid: any;

  constructor(
    
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _renderer2: Renderer2,
    private _router: Router,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private _authService: AuthService,
    private approute: ActivatedRoute,

  ) { 

    // const users: CourseData[] = [];
    // this.dataSource = new MatTableDataSource(users);
  }


  ngOnInit(): void {
     this.courseid = this.approute.snapshot.params['id'];

    this.GetCourseModules(this.courseid);
  }

  applyFilter(filterValue: string) {
    //
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  closeDetails(): void
    {
        this.selectedProduct = null;
    }

  showEditModal(id,courseid) {
    //
    var value="edit"
    this._router.navigate(['/courses/editcoursemodule/'+id+'/'+courseid+'/'+value])
  }
  showViewModal(id) {
    //
    var value="view"
    this._router.navigate(['/courses/editcoursemodule/'+id+'/'+value])
  }

  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }
  createProduct(id:any){
    

    // this._router.navigate(['/userconfig/role/addrole'])
    this._router.navigate(['/courses/addcoursemodule/'+id])
  }

  courseData :any= []
  GetCourseModules(Id:any) {
    //
    this._authService.GetCourseModules(Id).subscribe((finalresult: any) => {
      //
     var finalresult = JSON.parse(finalresult);
      if (finalresult.status == "200") {
        //
        // for(let i=0;i<finalresult.result.length;i++){
        //   if(finalresult.result[i].duration==0){
        //     finalresult.result[i].duration="";
        //   }
        //   else{
        //     finalresult.result[i].duration=finalresult.result[i].duration+""+finalresult.result[i].units;
        //   }
        //   if(finalresult.result[i].fees==0){
        //     finalresult.result[i].fees="Free";
        //   }

        // }
        this.dataSource = new MatTableDataSource(finalresult.result);
        // this.course= finalresult.result;
        
        //this.roles = finalresult.result;
        // console.log('techs',this.dataSource)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //const dataSource = this.roles ;
      }
      else {
        
      }
  });
  }
  deleteCourse(id:any): void
    {
      
      this.showAlert=false
      var data={
        ModuleId:id
      }
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete course',
            message: 'Are you sure you want to delete this course?',
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
          //  var data={
          //   id:id,
          //  }
              
                // Delete the contact
                this._authService.DeleteCourseModule(data).subscribe((data:any) => {
                    //
                    if (data.status == "200") {
                      // Set the alert
                      this.alert = {
                        type: 'success',
                        message: data.message
                      };
          
                      // Show the alert
                      this.showAlert = true;
                      setTimeout(() => {
                        this.showAlert = false
                      }, 2000);
                      //  this._router.navigate(['/userconfig/role/']);
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);
          
                    }
          
                    else if (data.status == "202") {
                      this.alert = {
                        type: 'error',
                        message: data.message
          
                      };
                      this.showAlert = true
                      setTimeout(() => {
                        this.showAlert = false
                      }, 2500);
          
          
                    }
                    else {
                      // this.spinner.hide();
                      this.alert = {
                        type: 'success',
                        message: "Invalid Id."
          
                      };
                      this.showAlert = true
                      setTimeout(() => {
                        this.showAlert = false
                      }, 2000);
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
