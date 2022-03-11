import { Directive, ElementRef,ChangeDetectorRef } from '@angular/core';


@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective {

  constructor(
    
    
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) { }
  ngAfterViewInit(){
    this.elementRef.nativeElement.focus();
    this.cdr.detectChanges();

}

}
