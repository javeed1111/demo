
import { ChangeDetectorRef, Component, OnInit, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-emailsettings',
  templateUrl: './emailsettings.component.html',
  styleUrls: ['./emailsettings.component.scss']
})
export class EmailsettingsComponent implements OnInit {

  displayedColumns = ['sno', 'user','sender','displayname','actions'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
    private _viewContainerRef: ViewContainerRef,
    private _authService: AuthService) { }

  ngOnInit(): void {
   this.GetEmails()

  }

  applyFilter(filterValue: string) {
    //
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showEditModal(id) {
    
    var value = "edit";
    this._router.navigate(['./masters/editemail/'+ id + '/' + value ])
  }
  showViewModal(id) {
    
    var value = "view"
    this._router.navigate(['/masters/editemail/' + id + '/' + value])
  }

  addemail() {
  
    this._router.navigate(['/masters/addemail'])
  }
  createProducts(){
    //

    // this._router.navigate(['/userconfig/role/addrole'])
    this._router.navigate(['/masters/masternavigation'])
  }
  GetEmails() {
    
    this._authService.GetEmails().subscribe((finalresult: any) => {
      
      if (finalresult.status == "200") {
        console.log('getemaildtls',finalresult.result);
        this.dataSource = new MatTableDataSource(finalresult.result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      else {

      }
    });
  }

  deleteContent(Id: any): void {
    //
    this.showAlert = false
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete Faculty',
      message: 'Are you sure you want to delete this Record?',
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
        var data= {
          Id:Id,
          UpdatedBy: parseInt(localStorage.getItem("LoginId"))
        }

        // Delete the contact
        this._authService.DeleteEmailById(data).subscribe((data: any) => {
          
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
            // this.spinner.hide();
            this.alert = {
              type: 'error',
              message: "Invalid Id."

            };
            this.showAlert = true
            setTimeout(() => {
              this.showAlert = false
            }, 2000);
            // this.notifications.alert('Alert', result.message, NotificationType.Alert, { theClass: 'outline primary', timeOut: 2000, showProgressBar: false });
          }

        });

      }
    });

  }

}

