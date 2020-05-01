import { Directive, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appBalanceTableStyle]'
})
export class BalanceTableStyleDirective {

  
  constructor(private renderer: Renderer2 ,
    private el : ElementRef,
    ) { }


    ngOnInit() {
      const targetElement  = this.el.nativeElement;
      const desiredWidth = targetElement.offsetWidth;
      const parent1 = this.renderer.parentNode(targetElement);
      const parent2 = this.renderer.parentNode(parent1);
      const parent3 = this.renderer.parentNode(parent2);
      this.renderer.setStyle(parent3, 'margin-left', desiredWidth+15 + 'px');
    }


}
