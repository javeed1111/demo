import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {

  constructor(    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    ) { }

  ngOnInit() {
     // Change page title on navigation  based on route data
    
  }

}