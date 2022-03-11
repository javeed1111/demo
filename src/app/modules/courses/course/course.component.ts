import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
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
// import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
export interface CourseData {
  sno: string;
  courseName: string;
  technologyName: string;
  title: string;
  duration: string;
  fees: string;
  Actions: string;
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
 styleUrls: ['./course.component.scss']
//   styles         : [
//     /* language=SCSS */
//     `
//         .inventory-grid {
//             grid-template-columns: 48px auto 40px;

//             @screen sm {
//                 grid-template-columns: 48px auto 112px 72px;
//             }

//             @screen md {
//                 grid-template-columns: 48px 112px auto 112px 72px;
//             }

//             @screen lg {
//                 grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
//             }
//         }
//     `
// ],
})
export class CourseComponent implements OnInit {
  isLoading: boolean = false;
  selectedProduct: any | null = null;
  displayedColumns = ['sno', 'courseName', 'technologyName', 'title','duration','fees','actions'];
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
  ) { 

    // const users: CourseData[] = [];
    // this.dataSource = new MatTableDataSource(users);
    this.GetCourses();
  }

  ngOnInit(): void {
    debugger
   
    
       // this.searchInputControl.valueChanges
       // .pipe(
       //     takeUntil(this._unsubscribeAll),
       //     debounceTime(300),
       //     switchMap((query) => {
       //       debugger
       //         this.closeDetails();
       //         this.isLoading = true;
       //         return this._authService.GetRoles(0, 10, 'roleName', 'asc', query);
       //     }),
       //     map(() => {
       //         this.isLoading = false;
       //     })
       // )
       // .subscribe();

       //    // Get the pagination
       //    this._venturesService.pagination$
       //    .pipe(takeUntil(this._unsubscribeAll))
       //    .subscribe((pagination: VenturePagination) => {

       //        // Update the pagination
       //        this.pagination = pagination;

       //        // Mark for check
       //        this._changeDetectorRef.markForCheck();
       //    });
  }
  ngAfterViewInit() {

  }
  applyFilter(filterValue: string) {
    debugger
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  closeDetails(): void
    {
        this.selectedProduct = null;
    }

  showEditModal(id) {
    debugger
    this._router.navigate(['/courses/editcourse/'+id])
  }

  ngOnDestroy(): void
  {
      // Unsubscribe from all subscriptions
      this._unsubscribeAll.next(null);
      this._unsubscribeAll.complete();
  }
  createProduct(){
    debugger

    // this._router.navigate(['/userconfig/role/addrole'])
    this._router.navigate(['/courses/addcourse'])
  }

  courseData :any= []
  GetCourses() {
    debugger
    this._authService.GetCourses().subscribe((finalresult: any) => {
      debugger
     var finalresult = JSON.parse(finalresult);
      if (finalresult.status == "200") {
        debugger
        for(let i=0;i<finalresult.result.length;i++){
          // finalresult.result[i].sno=i+1;
          if(finalresult.result[i].duration==0){
            finalresult.result[i].duration="";
            finalresult.result[i].fees="";
          }

        }
        
        // let itemdetails : CourseData ={}
        // finalresult.result.forEach(element => {
        //   let c={
        //         courseName:element.courseName,
        //         duration:element.duration,
        //         fees:element.fees,
        //         technologyName:element.technologyName,
        //         title:element.title,
        //   }
          


        //   this.courseData.push(c)
        // });
        
        // sthis.dataSource= finalresult.result;
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
      debugger
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

                // Delete the contact
                this._authService.deletecourse(id).subscribe((data:any) => {
                    debugger
                    if (data.status == "200") {
                        
                          
                        this.alert = {
                            type   : 'success',
                            message: data.message
                        
                        };
                      //  this._router.navigate(['/userconfig/role/']);
                        setTimeout(() => {
                            window.location.reload();
                        }, 0);
                        
                      }
                      else {
                        // this.spinner.hide();
                        this.alert = {
                            type   : 'success',
                            message: "Invalid Id."
                        
                        };
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
