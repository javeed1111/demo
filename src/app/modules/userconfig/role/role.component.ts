import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'app/core/auth/auth.service';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { FuseAlertType } from '@fuse/components/alert';
// import { VenturesService } from '../ventures.service';
// import { VenturePagination } from './venture';
export interface RoleData {
  sno: string;
  roleName: string;
  Actions: string;
}
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
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
export class RoleComponent implements OnInit, AfterViewInit {
  isLoading: boolean = false;
  selectedProduct: any | null = null;
  displayedColumns = ['sno', 'roleName', 'actions'];
  dataSource: MatTableDataSource<RoleData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  searchInputControl: FormControl = new FormControl();
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  venturesCount: any;
  _ventures: Object;
  roles: any;
  role: any;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  showAlert: boolean = false;



  constructor(private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private _renderer2: Renderer2,
    private _router: Router,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private _authService: AuthService,
    // private _venturesService:VenturesService
  ) { }

  ngOnInit(): void {
    //debugger
    this.GetRoles();

    // this.searchInputControl.valueChanges
    // .pipe(
    //     takeUntil(this._unsubscribeAll),
    //     debounceTime(300),
    //     switchMap((query) => {
    //       //debugger
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

  closeDetails(): void {
    this.selectedProduct = null;
  }

  showEditModal(id) {
    var value = "edit";
    //debugger
    this._router.navigate(['/userconfig/editrole/' + id + '/' + value])
  }
  showViewModal(id) {
    var value = "view";
    //debugger
    this._router.navigate(['/userconfig/editrole/' + id + '/' + value])
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  createProduct() {
    //debugger

    // this._router.navigate(['/userconfig/role/addrole'])
    this._router.navigate(['/userconfig/addrole'])
  }
  applyFilter(filterValue: string) {
    //debugger
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  GetRoles() {
    //debugger
    this._authService.GetRoles().subscribe((finalresult: any) => {
      //debugger
      var finalresult = JSON.parse(finalresult);
      if (finalresult.status == "200") {
        //debugger
        //this.dataSource= finalresult.result;
        //this.roles= finalresult.result;
        this.dataSource = new MatTableDataSource(finalresult.result);
        // console.log('techs',this.dataSource)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {

      }
    });
  }

  /**
    * Delete the role
    */
  deleteRole(id: any): void {
    //debugger
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete Role',
      message: 'Are you sure you want to delete this Role?',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });
    this.showAlert = false;

    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {

      // If the confirm button pressed...
      if (result === 'confirmed') {
        var CreatedBy = parseInt(localStorage.getItem("LoginId"))
        var data={
          Id:id
        }

        // Delete the contact
        this._authService.deleteRole(data).subscribe((data: any) => {
          //debugger
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
            }, 2000);


          }
          else {
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

