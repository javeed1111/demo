import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { debounceTime,BehaviorSubject, combineLatest, Subject, takeUntil  } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Contact, Country, Tag } from 'app/modules/userconfig/user/users.types';
import { UsersListComponent } from 'app/modules/userconfig/user/lists/list.component';
import { UsersService } from 'app/modules/userconfig/user/users.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthService } from 'app/core/auth/auth.service';
import { FuseAlertType } from '@fuse/components/alert';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector       : 'Add-users',
    templateUrl    : './adduser.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations   : fuseAnimations
})

export class AddUserComponent implements OnInit, OnDestroy
{
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

    

    editMode: boolean = false;
    addMode: boolean = false;
    viewMode: boolean = false;
    //isSlideChecked: boolean = true;
    tags: Tag[];
    tagsEditMode: boolean = false;
    filteredTags: Tag[];
    contact: Contact;
    contactForm: FormGroup;
    contacts: Contact[];
    countries: Country[];
    test
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    active: boolean;
    gender: any;
    roletype: any;
    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    showAlert:  boolean = false;
    alternatemobileno: any;
    alternateemail: any;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _contactsListComponent: UsersListComponent,
        private _contactsService: UsersService,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _renderer2: Renderer2,
        private _router: Router,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private _authService: AuthService,
        private el: ElementRef,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        //this.searchElement.nativeElement.focus();
        // Open the drawer
        this._contactsListComponent.matDrawer.open();

        // Create the contact form
        this.contactForm = this._formBuilder.group({
            id          : [''],
            avatar      : [null],
            firstname   : ['', [Validators.required]],
            lastname    : ['', []],
            email       : ['',[]],
            phoneNumber: ['',[]],
            alternateemail : ['',[]],
            alternatephoneNumber: ['',[]],
            userchkactive: [''],
            gender: [''],
            roleId: [''],
            address: [''],
            password: ['', [Validators.required]],

        });

        // Get the contacts
        this._contactsService.contacts$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((contacts: Contact[]) => {
                this.contacts = contacts;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the contact
        this._contactsService.contact$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((contact: Contact) => {
                //debugger

                // Open the drawer in case it is closed
                this._contactsListComponent.matDrawer.open();

                // Get the contact
                this.contact = contact;

                // Clear the emails and phoneNumbers form arrays
                // (this.contactForm.get('emails') as FormArray).clear();
                // (this.contactForm.get('phoneNumbers') as FormArray).clear();
                //(this.contactForm.get('alternateemail') as FormArray).clear();
                // (this.contactForm.get('alternatephoneNumber') as FormArray).clear();

                // Patch values to the form
                this.contactForm.patchValue(contact);
                this.toggleEditMode(true);

                // Setup the emails form array
                // const emailFormGroups = [];

                // if ( contact.emails.length > 0 )
                // {
                //     //debugger
                //     // Iterate through them
                //     contact.emails.forEach((email) => {

                //         // Create an email form group
                //         emailFormGroups.push(
                //             this._formBuilder.group({
                //                 email: [email.email],
                //                 label: [email.label]
                //             })
                //         );
                //     });
                // }
                // else
                // {
                //     // Create an email form group
                //     emailFormGroups.push(
                //         this._formBuilder.group({
                //             email: [''],
                //             label: ['']
                //         })
                //     );
                // }

                // //Add the email form groups to the emails form array
                // emailFormGroups.forEach((emailFormGroup) => {
                //     (this.contactForm.get('emails') as FormArray).push(emailFormGroup);
                // });
                // const alternateemailFormGroups = [];

                // if ( contact.alternateemail.length > 0 )
                // {
                //     contact.alternateemail.forEach((alterenateemail) => {

                //         alternateemailFormGroups.push(
                //             this._formBuilder.group({
                //                 alternateemail: [alterenateemail.email],
                //                 label: [alterenateemail.label]
                //             })
                //         );
                //     });
                // }
                // else
                // {
                //     alternateemailFormGroups.push(
                //         this._formBuilder.group({
                //             alterenateemail: [''],
                //             label: ['']
                //         })
                //     );
                // }

                // alternateemailFormGroups.forEach((alternateemailFormGroups) => {
                //     (this.contactForm.get('alternateemail') as FormArray).push(alternateemailFormGroups);
                // });

                // Setup the phone numbers form array
                // const phoneNumbersFormGroups = [];

                // if ( contact.phoneNumbers.length > 0 )
                // {
                //     // Iterate through them
                //     contact.phoneNumbers.forEach((phoneNumber) => {

                //         // Create an email form group
                //         phoneNumbersFormGroups.push(
                //             this._formBuilder.group({
                //                 country    : [phoneNumber.country],
                //                 phoneNumber: [phoneNumber.phoneNumber],
                //                 label      : [phoneNumber.label]
                //             })
                //         );
                //     });
                // }
                // else
                // {
                //     // Create a phone number form group
                //     phoneNumbersFormGroups.push(
                //         this._formBuilder.group({
                //             country    : ['us'],
                //             phoneNumber: [''],
                //             label      : ['']
                //         })
                //     );
                // }
                // // Add the phone numbers form groups to the phone numbers form array
                // phoneNumbersFormGroups.forEach((phoneNumbersFormGroup) => {
                //     (this.contactForm.get('phoneNumbers') as FormArray).push(phoneNumbersFormGroup);

                // });
                // if ( contact.alternatephoneNumbers.length > 0 )
                // {
                //     contact.alternatephoneNumbers.forEach((phoneNumber) => {

                //         phoneNumbersFormGroups.push(
                //             this._formBuilder.group({
                //                 alternatecountry    : [phoneNumber.country],
                //                 alternatephoneNumber: [phoneNumber.phoneNumber],
                //                 label      : [phoneNumber.label]
                //             })
                //         );
                //     });
                // }
                // else
                // {
                //     phoneNumbersFormGroups.push(
                //         this._formBuilder.group({
                //             country    : ['us'],
                //             alterenatephoneNumber: [''],
                //             label      : ['']
                //         })
                //     );
                // }

                // phoneNumbersFormGroups.forEach((phoneNumbersFormGroup) => {
                //     (this.contactForm.get('alternatephoneNumbers') as FormArray).push(phoneNumbersFormGroup);

                // });

                // Toggle the edit mode off
                this.toggleEditMode(false);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the country telephone codes
        this._contactsService.countries$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((codes: Country[]) => {
                //debugger
                this.countries = codes;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the tags
        this._contactsService.tags$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tags: Tag[]) => {
                this.tags = tags;
                this.filteredTags = tags;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Dispose the overlays if they are still on the DOM
        if ( this._tagsPanelOverlayRef )
        {
            this._tagsPanelOverlayRef.dispose();
        }
    }
    // ngAfterViewInit() {
    //     this.myInputField.nativeElement.focus();
    //     }
    

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._contactsListComponent.matDrawer.close();
    }

    /**
     * Toggle edit mode
     *
     * @param editMode
     */
    toggleEditMode(editMode: boolean | null = null): void
    {
        //debugger
        if ( editMode === null )
        {
            this.editMode = !this.editMode;
        }
        else
        {
            this.editMode = editMode;
        }

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    cancel(){
        this._router.navigate(['/userconfig/user/']);
        setTimeout(() => {
            window.location.reload();
           }, 10);
    }

    /**
     * Update the contact
     */
    updateContact(): void
    {
        // Get the contact object
        const contact = this.contactForm.getRawValue();

        // Go through the contact object and clear empty values
        contact.emails = contact.emails.filter(email => email.email);

        contact.phoneNumbers = contact.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

        // Update the contact on the server
        this._contactsService.updateContact(contact.id, contact).subscribe(() => {

            // Toggle the edit mode off
            this.toggleEditMode(false);
        });
    }
    toggleCompleted($event: MatSlideToggleChange): void
    {
        //debugger
        if($event.checked!=undefined){
            this.active = $event.checked;
        }
        else{
            this.active = true;
        }
        //this.active=this.filters.hideCompleted$.next(change.checked);
    }
    /**
     * add the user
     */
     AddUser()
     {
         //debugger
         if (this.contactForm.invalid) {
             return;
         }
      this.showAlert = false;

         
         // Get the contact object
         const contact = this.contactForm.getRawValue();
 
         // Go through the contact object and clear empty values
        //  contact.emails = contact.emails.filter(email => email.email);
 
        //  contact.phoneNumbers = contact.phoneNumbers.filter(phoneNumber => phoneNumber.phoneNumber);

         if(this.active==undefined){
            this.active = true;
        }
         var data = {
            FirstName: contact.firstname,
            LastName: contact.lastname,
            gender: contact.gender,
            MobileNo: contact.phoneNumber,
            AlternateMobileNo: contact.alternatephoneNumber,
            Email: contact.email,
            AlternateEmail: contact.alternateemail,
            Address: contact.address,
            RoleId: contact.roleId,
            Password: contact.password,
            CreatedBy: parseInt(localStorage.getItem("LoginId")),
            IsActive: this.active,
        }
         this._authService.Adduser(data).subscribe((result: any) => {
             //debugger
              var result = JSON.parse(result);
               if (result.status == "200") {
                   //debugger
                   
                    // Set the alert
                 this.alert = {
                    type   : 'success',
                    message: result.message 
                };
  
                // Show the alert
                this.showAlert = true;
                this._router.navigate(['/userconfig/user']);
                   setTimeout(() => {
                    window.location.reload();
                   }, 1000);
               }
               else {
                // Set the alert
                this.alert = {
                    type   : 'error',
                    message: result.message 
                };
  
                // Show the alert
                this.showAlert = true;
               }
               (error) => {
            this.toggleEditMode(false);
      
              }
           });
     }

     /**
     * Delete the contact
     */
    deleteUser(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete User',
            message: 'Are you sure you want to delete this User? This action cannot be undone!',
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
                // Get the current contact's id
                const id = this.contact.id;

                // Get the next/previous contact's id
                const currentContactIndex = this.contacts.findIndex(item => item.id === id);
                const nextContactIndex = currentContactIndex + ((currentContactIndex === (this.contacts.length - 1)) ? -1 : 1);
                const nextContactId = (this.contacts.length === 1 && this.contacts[0].id === id) ? null : this.contacts[nextContactIndex].id;

                // Delete the contact
                this._contactsService.deleteUser(id).subscribe((data:any) => {
                    //debugger
                    if (data.status == "200") {
                        
                          
                        this.alert = {
                            type   : 'success',
                            message: data.message
                        
                        };
                       this._router.navigate(['/userconfig/user/']);
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

    /**
     * Upload avatar
     *
     * @param fileList
     */
    uploadAvatar(fileList: FileList): void
    {
        // Return if canceled
        if ( !fileList.length )
        {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];

        // Return if the file is not allowed
        if ( !allowedTypes.includes(file.type) )
        {
            return;
        }

        // Upload the avatar
        this._contactsService.uploadAvatar(this.contact.id, file).subscribe();
    }

    /**
     * Remove the avatar
     */
    removeAvatar(): void
    {
        // Get the form control for 'avatar'
        const avatarFormControl = this.contactForm.get('avatar');

        // Set the avatar as null
        avatarFormControl.setValue(null);

        // Set the file input value as null
        this._avatarFileInput.nativeElement.value = null;

        // Update the contact
        this.contact.avatar = null;
    }

    /**
     * Open tags panel
     */
    openTagsPanel(): void
    {
        // Create the overlay
        this._tagsPanelOverlayRef = this._overlay.create({
            backdropClass   : '',
            hasBackdrop     : true,
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                                  .flexibleConnectedTo(this._tagsPanelOrigin.nativeElement)
                                  .withFlexibleDimensions(true)
                                  .withViewportMargin(64)
                                  .withLockedPosition(true)
                                  .withPositions([
                                      {
                                          originX : 'start',
                                          originY : 'bottom',
                                          overlayX: 'start',
                                          overlayY: 'top'
                                      }
                                  ])
        });

        // Subscribe to the attachments observable
        this._tagsPanelOverlayRef.attachments().subscribe(() => {

            // Add a class to the origin
            this._renderer2.addClass(this._tagsPanelOrigin.nativeElement, 'panel-opened');

            // Focus to the search input once the overlay has been attached
            this._tagsPanelOverlayRef.overlayElement.querySelector('input').focus();
        });

        // Create a portal from the template
        const templatePortal = new TemplatePortal(this._tagsPanel, this._viewContainerRef);

        // Attach the portal to the overlay
        this._tagsPanelOverlayRef.attach(templatePortal);

        // Subscribe to the backdrop click
        this._tagsPanelOverlayRef.backdropClick().subscribe(() => {

            // Remove the class from the origin
            this._renderer2.removeClass(this._tagsPanelOrigin.nativeElement, 'panel-opened');

            // If overlay exists and attached...
            if ( this._tagsPanelOverlayRef && this._tagsPanelOverlayRef.hasAttached() )
            {
                // Detach it
                this._tagsPanelOverlayRef.detach();

                // Reset the tag filter
                this.filteredTags = this.tags;

                // Toggle the edit mode off
                this.tagsEditMode = false;
            }

            // If template portal exists and attached...
            if ( templatePortal && templatePortal.isAttached )
            {
                // Detach it
                templatePortal.detach();
            }
        });
    }

    /**
     * Toggle the tags edit mode
     */
    toggleTagsEditMode(): void
    {
        this.tagsEditMode = !this.tagsEditMode;
    }

    /**
     * Filter tags
     *
     * @param event
     */
    filterTags(event): void
    {
        // Get the value
        const value = event.target.value.toLowerCase();

        // Filter the tags
        this.filteredTags = this.tags.filter(tag => tag.title.toLowerCase().includes(value));
    }

    /**
     * Filter tags input key down event
     *
     * @param event
     */
    filterTagsInputKeyDown(event): void
    {
        // Return if the pressed key is not 'Enter'
        if ( event.key !== 'Enter' )
        {
            return;
        }

        // If there is no tag available...
        if ( this.filteredTags.length === 0 )
        {
            // Create the tag
            this.createTag(event.target.value);

            // Clear the input
            event.target.value = '';

            // Return
            return;
        }

        // If there is a tag...
        const tag = this.filteredTags[0];
        const isTagApplied = this.contact.tags.find(id => id === tag.id);

        // If the found tag is already applied to the contact...
        if ( isTagApplied )
        {
            // Remove the tag from the contact
            this.removeTagFromContact(tag);
        }
        else
        {
            // Otherwise add the tag to the contact
            this.addTagToContact(tag);
        }
    }

    /**
     * Create a new tag
     *
     * @param title
     */
    createTag(title: string): void
    {
        const tag = {
            title
        };

        // Create tag on the server
        this._contactsService.createTag(tag)
            .subscribe((response) => {

                // Add the tag to the contact
                this.addTagToContact(response);
            });
    }

    /**
     * Update the tag title
     *
     * @param tag
     * @param event
     */
    updateTagTitle(tag: Tag, event): void
    {
        // Update the title on the tag
        tag.title = event.target.value;

        // Update the tag on the server
        this._contactsService.updateTag(tag.id, tag)
            .pipe(debounceTime(300))
            .subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Delete the tag
     *
     * @param tag
     */
    deleteTag(tag: Tag): void
    {
        // Delete the tag from the server
        this._contactsService.deleteTag(tag.id).subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Add tag to the contact
     *
     * @param tag
     */
    addTagToContact(tag: Tag): void
    {
        // Add the tag
        this.contact.tags.unshift(tag.id);

        // Update the contact form
        this.contactForm.get('tags').patchValue(this.contact.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove tag from the contact
     *
     * @param tag
     */
    removeTagFromContact(tag: Tag): void
    {
        // Remove the tag
        this.contact.tags.splice(this.contact.tags.findIndex(item => item === tag.id), 1);

        // Update the contact form
        this.contactForm.get('tags').patchValue(this.contact.tags);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Toggle contact tag
     *
     * @param tag
     */
    toggleContactTag(tag: Tag): void
    {
        if ( this.contact.tags.includes(tag.id) )
        {
            this.removeTagFromContact(tag);
        }
        else
        {
            this.addTagToContact(tag);
        }
    }

    /**
     * Should the create tag button be visible
     *
     * @param inputValue
     */
    shouldShowCreateTagButton(inputValue: string): boolean
    {
        return !!!(inputValue === '' || this.tags.findIndex(tag => tag.title.toLowerCase() === inputValue.toLowerCase()) > -1);
    }

    /**
     * Add the email field
     */
    addEmailField(): void
    {
        // Create an empty email form group
        const emailFormGroup = this._formBuilder.group({
            email: [''],
            label: ['']
        });

        // Add the email form group to the emails form array
        (this.contactForm.get('emails') as FormArray).push(emailFormGroup);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove the email field
     *
     * @param index
     */
    removeEmailField(index: number): void
    {
        // Get form array for emails
        const emailsFormArray = this.contactForm.get('emails') as FormArray;

        // Remove the email field
        emailsFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Add an empty phone number field
     */
    addPhoneNumberField(): void
    {
        // Create an empty phone number form group
        const phoneNumberFormGroup = this._formBuilder.group({
            country    : ['us'],
            phoneNumber: [''],
            label      : ['']
        });

        // Add the phone number form group to the phoneNumbers form array
        (this.contactForm.get('phoneNumbers') as FormArray).push(phoneNumberFormGroup);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Remove the phone number field
     *
     * @param index
     */
    removePhoneNumberField(index: number): void
    {
        // Get form array for phone numbers
        const phoneNumbersFormArray = this.contactForm.get('phoneNumbers') as FormArray;

        // Remove the phone number field
        phoneNumbersFormArray.removeAt(index);

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Get country info by iso code
     *
     * @param iso
     */
    getCountryByIso(iso: string): Country
    {
        return this.countries.find(country => country.iso === iso);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
