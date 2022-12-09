import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.scss']
})
export class StudentdetailsComponent implements OnInit {
  comparecount=1
  preview2: any;
  preview:any;
  preview1:any;
  showAlert1: boolean;
  newid: any;
  icon: string;
  constructor(    private _changeDetectorRef: ChangeDetectorRef,) { }

  ngOnInit(): void {
    this.preview=false;
    this.preview1=false;
  }
  closeDetails(): void
    {
        this.newid = null;
    }
    previews(){

      this.preview=true
       this.preview1=true
       this.preview2=true
    }
  toggleDetails()
    {
      var count =1
      if(count==this.comparecount){
      this.preview=true;
      this.comparecount+=1;
    }
    else{
      this.preview=false;
      this.comparecount-=1;

    }
      // if(selectedid== this.newid){
        // this.closeDetails();
        // return;
      // }
      this._changeDetectorRef.markForCheck();
           
    }

    toggleDetails1()
    {
      var count =1
      if(count==this.comparecount){
      this.preview1=true;
      this.comparecount+=1;
    }
    else{
      this.preview1=false;
      this.comparecount-=1;

    }
      // if(selectedid== this.newid){
        // this.closeDetails();
        // return;
      // }
      this._changeDetectorRef.markForCheck();
           
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
}
