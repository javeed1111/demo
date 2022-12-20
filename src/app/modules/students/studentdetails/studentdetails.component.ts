import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studentdetails',
  templateUrl: './studentdetails.component.html',
  styleUrls: ['./studentdetails.component.scss']
})
export class StudentdetailsComponent implements OnInit {

  constructor(    private _changeDetectorRef: ChangeDetectorRef,) { }

  ngOnInit(): void {
   
  }
  
}
