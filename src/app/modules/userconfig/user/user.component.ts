import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent 
    {
        /**
         * Constructor
         */
        constructor()
        {
        }
    }