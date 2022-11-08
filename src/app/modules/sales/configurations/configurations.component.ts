import { Overlay } from '@angular/cdk/overlay';
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
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {
  displayedColumns = ['sno', 'InvoiceFormat', 'actions'];
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
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    private _authService: AuthService) { }

  ngOnInit(): void {
    this.GetInvoiceNoFormat();
  }

  applyFilter(filterValue: string) {
    //
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showEditModal(id) {
    
    var value = "edit";
    this._router.navigate(['/masters/editconfigurations/' + id + '/' + value])
  }
  showViewModal(id) {
    
    var value = "view"
    this._router.navigate(['/masters/editconfigurations/' + id + '/' + value])
  }

  createProduct() {
  
    this._router.navigate(['/masters/addconfigurations'])
  }
  createProducts(){
    //

    // this._router.navigate(['/userconfig/role/addrole'])
    this._router.navigate(['/masters/masternavigation'])
  }
  GetInvoiceNoFormat() {
    //
    this._authService.GetInvoiceNoFormat().subscribe((finalresult: any) => {
      
      if (finalresult.status == "200") {
        //
    
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
        this._authService.deleteInvoiceNoFormat(data).subscribe((data: any) => {
          
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
