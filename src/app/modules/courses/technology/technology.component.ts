import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'app/core/auth/auth.service';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { FuseAlertType } from '@fuse/components/alert';
export interface TechnologyData {
  sno: string;
  technologyName: string;
  Actions: string;
}

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss']
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
export class TechnologyComponent implements OnInit {
  isLoading: boolean = false;
  selectedProduct: any | null = null;
  displayedColumns = ['sno','technologyName','actions'];
  dataSource: MatTableDataSource<TechnologyData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // pagination: VenturePagination;
  searchInputControl: FormControl = new FormControl();
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  roles: any;
  role: any;
  alert: { type: FuseAlertType; message: string } = {
    type   : 'success',
    message: ''
};
showAlert:  boolean = false;
  techs: any;

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
  ) { }

  ngOnInit(): void {
    debugger
    this.GetTechnologys();

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

  closeDetails(): void
    {
        this.selectedProduct = null;
    }
    applyFilter(filterValue: string) {
      debugger
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

  showEditModal(id) {
    debugger
    this._router.navigate(['/courses/edittechnology/'+id])
  }

  // ngOnDestroy(): void
  // {
  //     // Unsubscribe from all subscriptions
  //     this._unsubscribeAll.next(null);
  //     this._unsubscribeAll.complete();
  // }
  createProduct(){
    debugger

    // this._router.navigate(['/userconfig/role/addrole'])
    this._router.navigate(['/courses/addtechnology'])
  }
  GetTechnologys() {
    debugger
    this._authService.GetTechnologies().subscribe((finalresult: any) => {
      debugger
     var finalresult = JSON.parse(finalresult);
      if (finalresult.status == "200") {
        debugger
        //this.dataSource= finalresult.result;
        //this.techs= finalresult.result;
        this.dataSource = new MatTableDataSource(finalresult.result);
        // console.log('techs',this.dataSource)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {
        
      }
  });
  }
  deletetechnology(id:any): void
    {
      debugger
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete technology',
            message: 'Are you sure you want to delete this technology?',
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
                this._authService.deletetechnology(id).subscribe((data:any) => {
                    debugger
                    if (data.status == "200") {
                        
                          
                        this.alert = {
                            type   : 'success',
                            message: data.message
                        
                        };
                      //  this._router.navigate(['/userconfig/role/']);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                        
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
