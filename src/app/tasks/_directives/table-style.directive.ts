import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTableStyle]'
})

export class TableStyleDirective { //#######################################################################################################

  constructor(private renderer: Renderer2 , private el : ElementRef) { }


  ngOnInit() {
    const targetElement  = this.el.nativeElement;
    const desiredWidth = targetElement.offsetWidth;
    const parent1 = this.renderer.parentNode(targetElement);
    const parent2 = this.renderer.parentNode(parent1);
    const parent3 = this.renderer.parentNode(parent2);
    // this.renderer.setStyle(parent3, 'margin-left', desiredWidth+25 + 'px');
    this.renderer.setStyle(parent3, 'margin-left', desiredWidth + 'px');
  }


} //####################################################################################################################################
