import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { of } from 'rxjs';
const MINUTES_UNITL_AUTO_LOGOUT = 15// in mins
const CHECK_INTERVAL = 15000 // in ms
const STORE_KEY =  'lastAction';
@Injectable()

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    private _authenticated: boolean = false;
    public getLastAction() {
        return parseInt(localStorage.getItem(STORE_KEY));
      }
     public setLastAction(lastAction: number) {
        localStorage.setItem(STORE_KEY, lastAction.toString());
      }
    /**
     * Constructor
     */
     constructor(private route: Router,) { 
        this.check();
        this.initListener();
        this.initInterval();
        localStorage.setItem(STORE_KEY,Date.now().toString());
       
      }
      initListener() {
        document.body.addEventListener('click', () => this.reset());
        document.body.addEventListener('mouseover',()=> this.reset());
        document.body.addEventListener('mouseout',() => this.reset());
        document.body.addEventListener('keydown',() => this.reset());
        document.body.addEventListener('keyup',() => this.reset());
        document.body.addEventListener('keypress',() => this.reset());
      }
      reset() {
        this.setLastAction(Date.now());
      }
      initInterval() {
        setInterval(() => {
          this.check();
        }, CHECK_INTERVAL);
      }
      check() {
        const now = Date.now();
        const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;
    
        if (isTimeout)  {
          localStorage.clear();
          // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
        //   this.route.navigate(['sign-in']);
        }
      }
}
