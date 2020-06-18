import { Directive, ElementRef, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})

// #####################################################################################################################################################
export class ClickOutsideDirective { //#################################################################################################################
  @Output() clickOutside = new EventEmitter<Event>();

  constructor(private _elementRef : ElementRef) {}

  @HostListener('document:click', ['$event']) onClick(event) {
      const clickedInside = this._elementRef.nativeElement.contains(event.target);
      if (!clickedInside) { this.clickOutside.emit(event) }
  }

    

} //####################################################################################################################################################
// #####################################################################################################################################################
